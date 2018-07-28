from pony import orm
from orm.entities import *


def format_date(date):
    return date.strftime('%d.%m.%Y')


@orm.db_session
def get_all_reference_names():
    return [item.name for item in ReferenceName.select()]


@orm.db_session
def get_test(test_id):
    try:
        test = BloodTest[test_id]
        return {
            'id': test.id,
            'tag': test.tag.name,
            'date': format_date(test.date),
            'images': [{'id': i.id, 'path': i.url, 'width': i.width, 'height': i.height} for i in test.images],
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


def check_tag(tag_name):
    tag = Tag.get(name=tag_name)
    if not tag:
        raise ValueError('"{0}" tag is not defined'.format(tag_name))
    return tag


@orm.db_session
def save_test(date, values, image_id, tag):
    date = parse_date(date)
    if tag:
        tag = check_tag(tag)
    else:
        tag = Tag.get_default()

    image = TestImage[image_id]
    test_values = create_test_values(values)
    test = BloodTest(date=date, values=test_values, images=[image], tag=tag)

    orm.commit()
    return test.id


def create_test_values(values):
    parsed_values = check_values(values)
    test_values = [BloodTestEntry(name=p[0], value=float(p[1])) for p in parsed_values]
    return test_values


def parse_date(date):
    return datetime.strptime(date, '%d.%m.%Y')


@orm.db_session
def save_image(filename, url, width, height):
    image = TestImage(filename=filename, url=url, width=width, height=height)
    orm.commit()
    return image.id


@orm.db_session
def find_test_id(date):
    date = datetime.strptime(date, '%d.%m.%Y')
    test = select(s for s in BloodTest if s.date == date).first()
    if test:
        return str(test.id)
    else:
        return ''


@orm.db_session
def get_all_tests():
    query = select((x.id, x.date, x.tag, len(x.values)) for x in BloodTest)
    return [{
        'id': x[0],
        'date': format_date(x[1]),
        'tag': x[2].name,
        'numValues': x[3]
    } for x in query]


@orm.db_session
def delete_test(test_id):
    test = BloodTest[test_id]
    test.delete()


@orm.db_session
def replace_test(test_id, date, values, tag):
    test = BloodTest[test_id]

    test.date = parse_date(date)
    test.tag = check_tag(tag)

    for item in test.values:
        item.delete()

    test.values = create_test_values(values)


@orm.db_session
def update_test(test_id, values, tag, image_id):
    test = BloodTest[test_id]

    if tag:
        test.tag = check_tag(tag)

    if image_id:
        image = TestImage[image_id]
        test.images.add(image)

    for item in values:
        name = item[0]
        value = item[1]

        item = select(t for t in BloodTestEntry if t.name.name == name and test in t.blood_tests)
        if item:
            item.value = value
        else:
            item = BloodTestEntry(name=name, value=value)
            test.values.add(item)
