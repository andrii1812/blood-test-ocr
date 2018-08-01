import logging
from dotenv import load_dotenv
from flask import Flask
import flask_restful as rest
from flask_uploads import UploadSet, IMAGES, configure_uploads

app = Flask(__name__)
app.config.from_pyfile('../config.py')
api = rest.Api(app)
load_dotenv()

logging.basicConfig(level=logging.DEBUG if app.debug else logging.INFO)


@app.errorhandler(Exception)
def handle_error(error):
    message = str(error)
    status_code = getattr(error, 'code', 400)

    response = {
        'type': error.__class__.__name__,
        'message': message
    }

    return jsonify(response), status_code


images = UploadSet(app.config['UPLOADS_SET_NAME'], IMAGES)
configure_uploads(app, images)

from web.views import *

api.add_resource(Test, '/test/<int:test_id>', '/test')
api.add_resource(ImageRes, '/image/<int:image_id>', '/image')
