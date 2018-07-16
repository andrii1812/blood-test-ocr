from flask import Flask
import flask_restful as rest

app = Flask(__name__)
api = rest.Api(app)

from web.views import *

