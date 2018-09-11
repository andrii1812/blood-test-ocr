from operator import itemgetter

import itertools
from pony import orm
from orm.entities import *


def format_date(date):
    return date.strftime('%d.%m.%Y')


@orm.db_session
def get_all_reference_names():
    return [item.name for item in ReferenceName.select()]


def format_image(i):
    return {
        'id': i.id,
        'path': i.url,
        'width': i.width,
        'height': i.height,
        'tests': len(i.tests)
    }


@orm.db_session
def get_test(test_id):
    try:
        test = BloodTest[test_id]
        return {
            'id': test.id,
            'tag': test.tag.name,
            'date': format_date(test.date),
            'images': [format_image(i) for i in test.images],
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
def save_test(date, values, images, tag):
    if find_test_id(date):
        raise ValueError('test with date {0} already exists'.format(date))

    date = parse_date(date)

    if tag:
        tag = check_tag(tag)
    else:
        tag = get_default_tag()

    images = [TestImage[image['id']] for image in images]
    test_values = create_test_values(values)
    test = BloodTest(date=date, values=test_values, images=images, tag=tag)

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
    date = parse_date(date)
    test = select(s for s in BloodTest if s.date == date).first()

    if not test:
        return

    return {'id': str(test.id), 'tag': test.tag.name}


@orm.db_session
def get_all_tests():
    query = select((x.id, x.date, x.tag, len(x.values), len(x.images)) for x in BloodTest)
    return [{
        'id': x[0],
        'date': format_date(x[1]),
        'tag': x[2].name,
        'numValues': x[3],
        'numImages': x[4]
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


@orm.db_session
def get_tags():
    return [x.name for x in Tag.select()]


@orm.db_session
def get_default_tag():
    return Tag.get(name=config.NONE_TAG_NAME)


@orm.db_session
def get_all_images():
    return [format_image(i) for i in TestImage.select()]


def get_base_path():
    return os.path.join(
        os.path.dirname(__file__),
        '..',
        config.UPLOADS_DEFAULT_DEST,
        config.UPLOADS_SET_NAME)


@orm.db_session
def get_image_path(image_id):
    filename = select(x.filename for x in TestImage if x.id == image_id).first()
    base = get_base_path()
    return os.path.join(base, filename)


@orm.db_session
def get_image(image_id):
    return format_image(TestImage[image_id])


@orm.db_session
def delete_image(image_id):
    image = TestImage[image_id]

    if len(image.tests) != 0:
        raise ValueError('cannot delete image that used in tests')

    image.delete()


@orm.db_session
def min_date():
    return min(x.date for x in BloodTest.select())


@orm.db_session
def max_date():
    return max(x.date for x in BloodTest.select())


def array_where_clause(name, array):
    dic = dict(('p' + str(i), val) for i, val in enumerate(array))
    format_ = '{0} = {1} '
    terms = map(lambda x: format_.format(name, '(select id from ReferenceName where name = $' + x[0] + ')'),
                dic.items())
    return "OR ".join(terms), dic


@orm.db_session
def generate_statistics(from_, to, tag, lines):
    orm.sql_debug(True)
    from_ = parse_date(from_) if from_ else min_date()
    to = parse_date(to) if to else max_date()

    lines_clause, lines_params = array_where_clause("be.name", lines)

    if tag:
        where_clause = "tag = (select id from Tag where name = $tag)"
    else:
        where_clause = "date <= datetime($to, '+1 second') AND date >= $f"
    sql = "SELECT bt.date, bt.tag, be.value, be.name FROM " + \
          "BloodTestEntry as be JOIN BloodTest_BloodTestEntry as bte " + \
          "on be.id = bte.bloodtestentry " + \
          "JOIN BloodTest bt on bt.id = bte.bloodtest " + \
          "WHERE (" + lines_clause + ") AND bt.id in " + \
          "(SELECT id from BloodTest WHERE " + where_clause + ") " + \
          "ORDER BY bt.date ASC "

    sel = db.select(sql, globals={'f': from_, 'to': to, 'tag': tag, **lines_params})
    sel = list(map(lambda x: (datetime.strptime(x[0], '%Y-%m-%d %X.%f'), x[1], x[2], x[3]), sel))

    sorted_dates = sorted(set(map(itemgetter(0), sel)))
    x = list(map(format_date, sorted_dates))
    y = []

    for ref_name in lines:
        ref_obj = select(x for x in ReferenceName if x.name == ref_name).first()
        values = list(map(lambda x: x[2], filter(lambda x: x[3] == ref_obj.id, sel)))
        data = {'name': ref_name, 'data': values}
        y.append(data)

    fill_rect = []
    default_tag = get_default_tag().id
    for k, g in itertools.groupby(sel, lambda x: x[1]):
        if k == default_tag:
            continue
        g = list(g)
        from_ = min(map(lambda x: x[0], g))
        to = max(map(lambda x: x[0], g))
        fill_rect.append({'from': format_date(from_), 'to': format_date(to)})

    return {
        'x': x,
        'y': y,
        'fill': fill_rect
    }
