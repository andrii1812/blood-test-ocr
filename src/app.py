import os

import config
import web
import orm
from orm.cleanup import clean_up_unused_images, fix_reference_names, resize_uploads
from orm.setup import seed_db

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
def export_data():
    os.chdir(app.root_path)
    if not os.path.exists(config.EXPORT_PATH):
        os.mkdir(config.EXPORT_PATH)
    orm.export_data(config.EXPORT_PATH)

@app.cli.command()
def import_data():
    orm.import_data(config.EXPORT_PATH)


@app.cli.command()
def fix_references():
    fix_reference_names([('Eosınofıl%', 'Eozinofil%'), ('Basofıl#', 'Bazofil#')])


if __name__ == '__main__':
    #web.ocr.test()
    #fix_reference_names([('PCT!', 'PCT')])
    #app.run(host=os.getenv('HOST'), port=os.getenv('PORT'), debug=True)
    pass
