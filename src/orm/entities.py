import os
from datetime import datetime

import config
import pony.orm as p

db = p.Database()


class ReferenceName(db.Entity):
    id = p.PrimaryKey(int, auto=True)
    name = p.Required(str, unique=True)
    sort_order = p.Required(int)
    blood_test_entries = p.Set('BloodTestEntry')


class BloodTestEntry(db.Entity):
    name = p.Required('ReferenceName')
    value = p.Required(float)
    blood_tests = p.Set('BloodTest')


class Tag(db.Entity):
    id = p.PrimaryKey(int, auto=True)
    name = p.Required(str, unique=True)
    sort_order = p.Required(int)
    blood_tests = p.Set('BloodTest')


class BloodTest(db.Entity):
    id = p.PrimaryKey(int, auto=True)
    date = p.Required(datetime)
    values = p.Set('BloodTestEntry')
    images = p.Set('TestImage')
    tag = p.Required('Tag')


class TestImage(db.Entity):
    id = p.PrimaryKey(int, auto=True)
    filename = p.Required(str)
    url = p.Required(str)
    width = p.Required(int)
    height = p.Required(int)
    tests = p.Set('BloodTest')


def init_db():
    path = os.path.join(config.UPLOADS_DEFAULT_DEST, config.UPLOADS_SET_NAME)
    if not os.path.exists(path):
        os.makedirs(path)
    db.bind('sqlite', config.DATABASE_PATH, create_db=True)
    db.generate_mapping(create_tables=True)
    all_entities = [ReferenceName, Tag, TestImage, BloodTestEntry, BloodTest]

    with db.set_perms_for(*all_entities):
        p.perm('view', group='anybody')
