import os

import config
from orm import TestImage, orm, ReferenceName, get_base_path


@orm.db_session
def clean_up_unused_images():
    images_to_delete = (x for x in TestImage.select() if not x.tests)
    base_path = get_base_path()
    for image in images_to_delete:
        path = os.path.join(base_path, image.filename)
        image.delete()
        print('removing {0}'.format(path))
        os.remove(path)


@orm.db_session
def fix_reference_names(names):
    for find, replace in names:
        f = ReferenceName.get(name=find)

        if not f:
            print('"{0}" not found. Ignoring'.format(find))
            continue

        rep = ReferenceName(name=replace)
        for test in f.blood_test_entries:
            test.name = rep
        f.delete()


if __name__ == '__main__':
    clean_up_unused_images()
