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
    return send_from_directory(os.path.join('..', web.app.config['UPLOADS_DEFAULT_DEST']),
                               filename)


@web.app.route('/reference_names')
def reference_names():
    return jsonify(orm.get_all_reference_names())


@web.app.route('/ingest_image', methods=['POST'])
def ingest_image():
    image_obj = request.files['image']

    image = Image.open(image_obj.stream)
    test = ocr.parse_image(image)

    image_obj.stream.seek(0)
    filename = web.images.save(image_obj)
    url = web.images.url(filename)
    image_id = orm.save_image(filename, url, image.width, image.height)

    result = test._asdict()
    result['images'] = [{'id': image_id, 'path': url, 'width': image.width, 'height': image.height}]
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
        image_id = test_data['images'][0]['id']
        tag = test_data.get('tag')
        test_id = orm.save_test(date, values, image_id, tag)
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
    return orm.find_test_id(date)
