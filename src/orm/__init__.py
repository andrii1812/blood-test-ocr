from .logic import *
from .entities import init_db
from .setup import seed_db


def disconnect():
    db.disconnect()
    db.provider = None
    db.schema = None