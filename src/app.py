import os
import unittest

import config
import web
from orm.cleanup import clean_up_unused_images, resize_uploads
from orm.setup import seed_db
from migrate.data_migrate import migrate_data as migrate_data_

app = web.app


@app.cli.command()
def setup_db():
    web.init_app()
    seed_db()


@app.cli.command()
def clean_uploads():
    web.init_app()
    clean_up_unused_images()


@app.cli.command()
def resize_images():
    web.init_app()
    resize_uploads()


@app.cli.command()
def migrate_data():
    web.init_app()
    os.chdir(app.root_path)
    migrate_data_(config.DATABASE_PATH)


@app.cli.command()
def test():
    suite = unittest.TestLoader().discover('.')
    unittest.TextTestRunner(verbosity=2).run(suite)


if __name__ == '__main__':
    #web.ocr.test()
    app.run(host=os.getenv('HOST'), port=os.getenv('PORT'), debug=True)
    pass
