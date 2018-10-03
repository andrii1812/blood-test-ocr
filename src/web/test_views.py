import io
import os
import shutil
import tempfile
import unittest

from PIL import Image

import config
import web
import orm


class DbTestCase(unittest.TestCase):
    def __init__(self, method_name):
        self.app_client = web.app.test_client()
        super().__init__(method_name)

    def assert_shape_in_array(self, arr, fields):
        for x in arr:
            self.assert_shape(x, fields)

    def assert_shape(self, obj, fields):
        self.assertTrue(all(y in fields for y in obj.keys()))

    def assert_response(self, res):
        self.assertTrue(res.is_json)
        message = res.json.get('message') if res.status_code != 200 else ''
        self.assertEqual(res.status_code, 200, message)
        return res.json

    def setUp(self):
        config.DATABASE_PATH = ':memory:'
        config.UPLOADS_DEFAULT_DEST = 'data/test/'
        web.init_app()

    def tearDown(self):
        orm.disconnect()
        shutil.rmtree(config.UPLOADS_DEFAULT_DEST, ignore_errors=True)


class TestSeedDb(DbTestCase):
    def test_get_reference_names(self):
        res = self.app_client.get('/reference_names')
        json_body = self.assert_response(res)
        self.assert_shape_in_array(json_body, ['name', 'sortOrder'])
        self.assertEqual(len(json_body), 48)

    def test_get_tags(self):
        res = self.app_client.get('/tag')
        json_body = self.assert_response(res)
        self.assert_shape_in_array(json_body, ['name', 'sortOrder'])
        self.assertEqual(len(json_body), 4)


class TestImageResource(DbTestCase):
    @staticmethod
    def create_image():
        file_name = tempfile.mktemp(dir=config.UPLOADS_DEFAULT_DEST) + '.png'
        with open(file_name, 'wb') as file:
            image = Image.new('RGB', (200, 200), 'black')
            image.save(file, 'png')
        return file_name

    def upload_image(self, image_name=None):
        image_name = image_name or self.create_image()
        with open(image_name, 'rb') as file:
            res = self.app_client.post('/image', data={
                'image':
                    (io.BytesIO(file.read()), os.path.basename(image_name))
            })
            return self.assert_response(res)

    @staticmethod
    def image_save_path(name):
        return os.path.join(
            config.UPLOADS_DEFAULT_DEST,
            config.UPLOADS_SET_NAME,
            os.path.basename(name)
        )

    def test_post(self):
        image_path = self.create_image()
        image_id = self.upload_image(image_path)
        self.assertEqual(type(image_id), str)
        self.assertTrue(image_id.isdigit())
        self.assertTrue(os.path.exists(self.image_save_path(image_path)))

    def test_get_single(self):
        id = self.upload_image()
        res = self.app_client.get('/image/' + id)
        json_res = self.assert_response(res)
        self.assert_shape(json_res, ['path', 'width', 'height', 'tests', 'id'])

    def test_get_all(self):
        ids = [int(self.upload_image()), int(self.upload_image())]
        res = self.app_client.get('/image')
        json_res = self.assert_response(res)
        self.assert_shape_in_array(json_res,
                                   ['path', 'width', 'height', 'tests', 'id'])
        self.assertEqual(len(json_res), 2)
        for id in map(lambda x: x['id'], json_res):
            self.assertIn(id, ids)

    def test_delete(self):
        image_path = self.create_image()
        image_id = self.upload_image(image_path)
        res = self.app_client.delete('/image/' + image_id)
        self.assertEqual(res.status_code, 204)
        self.assertEqual(len(res.data), 0)
        self.assertFalse(os.path.exists(self.image_save_path(image_path)))

