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
    date = PrimaryKey(datetime)
    values = Set('BloodTestEntry')
    image = Required(bytes)
    tag = Required('Tag')

db.bind('sqlite', os.path.join('..', config.DATABASE_PATH), create_db=True)
db.generate_mapping(create_tables=True)
