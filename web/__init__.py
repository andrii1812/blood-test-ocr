from flask import Flask
import flask_restful as rest
from flask_uploads import UploadSet, IMAGES, configure_uploads

app = Flask(__name__)
app.config.from_pyfile('../config.py')
api = rest.Api(app)


@app.errorhandler(ValueError)
def handle_invalid_usage(error):
    response = jsonify(error.args[0])
    response.status_code = 400
    return response


images = UploadSet(app.config['UPLOADS_SET_NAME'], IMAGES)
configure_uploads(app, images)

from web.views import *

api.add_resource(Test, '/test/<int:test_id>', '/test')
