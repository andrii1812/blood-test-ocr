from datetime import datetime
from PIL import Image
from flask import request, jsonify, Response
from flask_restful import Resource, marshal_with, fields, abort

import ocr
import web
import orm


@web.app.route('/')
def index():
    return web.app.send_static_file('dist/index.html')


@web.app.route('/reference_names')
def reference_names():
    return jsonify(orm.get_all_reference_names())


@web.app.route('/ingest_image', methods=['POST'])
def ingest_image():
    image_obj = request.files['image']

    image = Image.open(image_obj.stream)
    test = ocr.parse_image(image)

    filename = web.images.save(image_obj)
    url = web.images.url(filename)
    return jsonify({'url': url, 'test': test._asdict()})


class Test(Resource):
    def get(self, test_id):
        return orm.get_test(test_id)

    def post(self):
        data = request.json['test']
        date = data['date']
        values = data['values']
        url = request.json['url']
        tag = request.json.get('tag')
        test_id = orm.save_test(date, values, url, tag)
        return test_id


@web.app.route('/find_test_id')
def find_test():
    date = request.args.get('date')
    if not date:
        return abort(400)
    return jsonify(orm.find_test_id(date))