import os
from PIL import Image
from flask import request, jsonify, send_from_directory
from flask_restful import Resource, abort

import ocr
import web
import orm


@web.app.route('/')
def index():
    return web.app.send_static_file('dist/index.html')


@web.app.route('/uploads/<path:filename>')
def uploaded_file(filename):
    return send_from_directory(
        os.path.join('..', web.app.config['UPLOADS_DEFAULT_DEST']), filename)


class ImageRes(Resource):
    def get(self, image_id=None):
        if image_id:
            return jsonify(orm.get_image(image_id))

        images = orm.get_all_images()
        return jsonify(images)

    def post(self):
        image_obj = request.files['image']
        filename = web.images.save(image_obj)
        url = web.images.url(filename)

        image_obj.stream.seek(0)
        with Image.open(image_obj.stream) as image:
            image_id = orm.save_image(filename, url, image.width, image.height)
            return str(image_id)

    def delete(self, image_id):
        orm.delete_image(image_id)
        return '', 204


@web.app.route('/image/<int:image_id>/parse')
def parse_existing(image_id):
    image_path = orm.get_image_path(image_id)
    references = orm.get_all_reference_names()
    with open(image_path, 'rb') as image_stream:
        image = Image.open(image_stream)
        test = ocr.parse_image(image, references)
        result = test._asdict()
        result['images'] = [orm.get_image(image_id)]
        result['tag'] = orm.get_default_tag().name
        return jsonify(result)


@web.app.route('/reference_names')
def reference_names():
    return jsonify(orm.get_all_reference_names())


@web.app.route('/ingest_image', methods=['POST'])
def ingest_image():
    references = orm.get_all_reference_names()

    image_obj = request.files['image']
    image = Image.open(image_obj.stream)
    test = ocr.parse_image(image, references)

    image_obj.stream.seek(0)
    filename = web.images.save(image_obj)
    url = web.images.url(filename)
    image_id = orm.save_image(filename, url, image.width, image.height)

    result = test._asdict()
    result['images'] = [
        {
            'id': image_id,
            'path': url,
            'width': image.width,
            'height': image.height
        }
    ]
    result['tag'] = orm.get_default_tag().name
    return jsonify(result)


class Test(Resource):
    def get(self, test_id=None):
        if not test_id:
            return orm.get_all_tests()
        return orm.get_test(test_id)

    def post(self):
        test_data = request.json
        date = test_data['date']
        values = test_data['values']
        images = test_data['images']
        tag = test_data.get('tag')
        test_id = orm.save_test(date, values, images, tag)
        return test_id

    def put(self, test_id):
        test_data = request.json
        date = test_data['date']
        values = test_data['values']
        tag = test_data['tag']
        orm.replace_test(test_id, date, values, tag)
        return '', 204

    def patch(self, test_id):
        test_data = request.json
        values = test_data.get('values', [])
        tag = test_data.get('tag')
        images = test_data.get('images')
        if images:
            image_id = images[0]['id']
        else:
            image_id = None
        orm.update_test(test_id, values, tag, image_id)
        return '', 204

    def delete(self, test_id):
        orm.delete_test(test_id)
        return '', 204


@web.app.route('/find_test_id')
def find_test():
    date = request.args.get('date')
    if not date:
        return abort(400)

    res = orm.find_test_id(date)

    if not res:
        raise ValueError('test with date {0} not found'.format(date))

    return jsonify(res)


@web.app.route('/tag')
def get_tags():
    return jsonify(orm.get_tags())


@web.app.route('/stat', methods=['POST'])
def get_statistics():
    data = request.json
    from_ = data.get('from')
    to = data.get('to')
    tag = data.get('tag')
    lines = list(map(lambda x: x['name'], data['lines']))

    if not lines:
        raise ValueError('there should be at least one line selected')

    return jsonify(orm.generate_statistics(from_, to, tag, lines))
