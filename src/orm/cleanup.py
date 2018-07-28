import os

import config
from orm import TestImage, orm


@orm.db_session
def clean_up_unused_images():
    images_to_delete = (x for x in TestImage.select() if not x.tests)
    base_path = os.path.join(
                    os.path.dirname(__file__),
                    '..',
                    config.UPLOADS_DEFAULT_DEST,
                    config.UPLOADS_SET_NAME)
    for image in images_to_delete:
        path = os.path.join(base_path, image.filename)
        image.delete()
        print('removing {0}'.format(path))
        os.remove(path)


if __name__ == '__main__':
    clean_up_unused_images()