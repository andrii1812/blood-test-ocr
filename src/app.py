import os

import config
import web
from orm.cleanup import clean_up_unused_images, resize_uploads
from orm.setup import seed_db
from migrate.data_migrate import migrate_data as migrate_data_

app = web.app


@app.cli.command()
def setup_db():
    seed_db()


@app.cli.command()
def clean_uploads():
    clean_up_unused_images()


@app.cli.command()
def resize_images():
    resize_uploads()


@app.cli.command()
def migrate_data():
    os.chdir(app.root_path)
    migrate_data_(config.DATABASE_PATH)


if __name__ == '__main__':
    #web.ocr.test()
    app.run(host=os.getenv('HOST'), port=os.getenv('PORT'), debug=True)
    pass
