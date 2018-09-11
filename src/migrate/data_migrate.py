import os
import sqlite3

import sys


def migrate_data(path):
    conn = sqlite3.connect(path)
    with open('../migrate/migrate.sql') as file:
        content = file.read()
        backup_path = os.path.abspath(path + '.BACKUP')
        content = content.replace('$ATTACH_DB', backup_path)
        conn.executescript(content)


if __name__ == '__main__':
    migrate_data(sys.argv[1])
