from flask import redirect, url_for, json
import web
import orm


@web.app.route('/')
def index():
    return redirect(url_for('static', filename='index.html'))


@web.app.route('/reference_names')
def reference_names():
    return json.dumps(orm.get_all_reference_names())
