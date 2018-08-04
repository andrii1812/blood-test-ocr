import os

import itertools

from orm import TestImage, orm, ReferenceName, get_base_path


@orm.db_session
def clean_up_unused_images():
    base_path = get_base_path()
    images_to_delete = ((x, x.filename) for x in TestImage.select() if not x.tests)

    all_images = [x.filename for x in TestImage.select()]
    dangling_images = ((None, file) for file in os.listdir(base_path) if file not in all_images)

    for image, filename in itertools.chain(images_to_delete, dangling_images):
        path = os.path.join(base_path, filename)
        if image:
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

