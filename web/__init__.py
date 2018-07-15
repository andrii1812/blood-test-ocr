from flask import Flask
import flask_restful as rest

app = Flask(__name__, static_url_path='')
api = rest.Api(app)

from web.views import *

