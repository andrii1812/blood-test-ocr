import logging
from dotenv import load_dotenv
from flask import Flask
import flask_restful as rest
from flask_uploads import UploadSet, IMAGES, configure_uploads


logger = logging.getLogger(__name__)
app = Flask(__name__)

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

    logger.error('http error: {0}'.format(message))
    return jsonify(response), status_code

images = None

from web.views import *

api.add_resource(Test, '/test/<int:test_id>', '/test')
api.add_resource(ImageRes, '/image/<int:image_id>', '/image')


@app.before_first_request
def init_app():
    global images
    app.config.from_object('config')
    images = UploadSet(app.config['UPLOADS_SET_NAME'], IMAGES)
    logger.info('init app')
    configure_uploads(app, images)
    if not orm.db.provider:
        logger.info('init db')
        orm.init_db()
        orm.seed_db()
