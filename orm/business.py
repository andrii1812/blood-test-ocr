from pony import orm
from orm.entities import ReferenceName


def get_all_reference_names():
    with orm.db_session:
        return [item.name for item in ReferenceName.select()]
