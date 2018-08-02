import os

import web
from orm.cleanup import clean_up_unused_images, fix_reference_names
from orm.setup import seed_db

app = web.app


@app.cli.command()
def setup_db():
    seed_db()


@app.cli.command()
def clean_uploads():
    clean_up_unused_images()


@app.cli.command()
def fix_references():
    fix_reference_names([('Eosınofıl%', 'Eozinofil%'), ('Basofıl#', 'Bazofil#')])


if __name__ == '__main__':
    #web.ocr.test()
    #fix_reference_names([('PCT!', 'PCT')])
    app.run(host=os.getenv('HOST'), port=os.getenv('PORT'), debug=True)
    pass
