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
    tag = Optional('Tag')


class TestImage(db.Entity):
    id = PrimaryKey(int, auto=True)
    path = Required(str)
    tests = Set('BloodTest')


db.bind('sqlite', os.path.join('..', config.DATABASE_PATH), create_db=True)
db.generate_mapping(create_tables=True)
