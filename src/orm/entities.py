import os
from datetime import datetime

import config
from pony.orm import *

db = Database()


class ReferenceName(db.Entity):
    name = PrimaryKey(str)
    blood_test_entries = Set('BloodTestEntry')


class BloodTestEntry(db.Entity):
    name = Required('ReferenceName')
    value = Required(float)
    blood_tests = Set('BloodTest')


class Tag(db.Entity):
    name = PrimaryKey(str)
    blood_tests = Set('BloodTest')


class BloodTest(db.Entity):
    id = PrimaryKey(int, auto=True)
    date = Required(datetime)
    values = Set('BloodTestEntry')
    images = Set('TestImage')
    tag = Required('Tag')


class TestImage(db.Entity):
    id = PrimaryKey(int, auto=True)
    filename = Required(str)
    url = Required(str)
    width = Required(int)
    height = Required(int)
    tests = Set('BloodTest')


path = os.path.join(config.UPLOADS_DEFAULT_DEST, config.UPLOADS_SET_NAME)
if not os.path.exists(path):
    os.makedirs(path)
db.bind('sqlite', config.DATABASE_PATH, create_db=True)
db.generate_mapping(create_tables=True)

all_entities = [ReferenceName, Tag, TestImage, BloodTestEntry, BloodTest]

with db.set_perms_for(*all_entities):
    perm('view', group='anybody')
