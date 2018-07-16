from flask import url_for, json, send_from_directory
import web
import orm


@web.app.route('/')
def index():
    return web.app.send_static_file('dist/index.html')


@web.app.route('/reference_names')
def reference_names():
    return json.dumps(orm.get_all_reference_names())


@web.app.route('/parse_image')
def parse_image():
    pass