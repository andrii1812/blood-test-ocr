import web
from orm.cleanup import clean_up_unused_images
from orm.setup import seed_db

app = web.app


@app.cli.command()
def setup_db():
    seed_db()


@app.cli.command()
def clean_uploads():
    clean_up_unused_images()
