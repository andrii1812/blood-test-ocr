import os

DATABASE_PATH = os.getenv('DATABASE_PATH') or '../data/db.sqlite'
UPLOADS_DEFAULT_DEST = os.getenv('UPLOADS_DEFAULT_DEST') or 'data/uploads/'
UPLOADS_DEFAULT_URL = os.getenv('UPLOADS_DEFAULT_URL') or '/uploads/'
UPLOADS_SET_NAME = os.getenv('UPLOADS_SET_NAME') or 'images'
NONE_TAG_NAME = os.getenv('NONE_TAG_NAME') or 'None'
IMAGE_RESIZE_TRESHOLD = 1  # in Mb
IMAGE_RESIZE_RATIO = 0.5
