import json
import os
import logging
import orm.entities


logger = logging.getLogger(__name__)


@orm.db_session
def export_data(export_path):
    for entity in orm.entities.all_entities:
        name = entity.__name__ + '.json'
        path = os.path.join(export_path, name)

        with open(path, 'w') as w:
            logger.info(path)
            lst = entity.select().to_json()
            w.write(lst)


@orm.db_session
def import_data(export_path):
    pass