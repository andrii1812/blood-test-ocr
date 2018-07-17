from pony import orm
from orm.entities import *


@orm.db_session
def get_all_reference_names():
    return [item.name for item in ReferenceName.select()]


@orm.db_session
def get_test(test_id):
    try:
        test = BloodTest[test_id]
        return {
            'id': test.id,
            'tag': test.tag,
            'date': test.date.strftime('%d.%m.%Y'),
            'images': [{'id': i.id, 'path': i.path} for i in test.images],
            'values': [[v.name.name, v.value] for v in test.values]
        }
    except ObjectNotFound:
        return None


def check_values(values):
    for val in values:
        ref = select(r for r in ReferenceName if r.name == val[0]).first()
        if not ref:
            raise ValueError('"{0}" is not a valid test entry value'.format(val[0]))
        else:
            yield ref, val[1]


def check_tag(tag):
    return select(t.name == tag for t in Tag)


@orm.db_session
def save_test(date, values, url, tag):
    date = datetime.strptime(date, '%d.%m.%Y')
    parsed_values = check_values(values)
    if tag:
        tag = check_tag(tag)

    image = TestImage(path=url)
    test_values = [BloodTestEntry(name=p[0], value=float(p[1])) for p in parsed_values]
    test = BloodTest(date=date, values=test_values, images=[image], tag=tag)
    if tag:
        test.tag = check_tag(tag)

    orm.commit()
    return test.id


@orm.db_session
def find_test_id(date):
    date = datetime.strptime(date, '%d.%m.%Y')
    test = select(s for s in BloodTest if s.date == date).first()
    if test:
        return test.id
