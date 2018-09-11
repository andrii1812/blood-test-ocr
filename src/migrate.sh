#! /usr/bin/env bash

if [ ! -f 'data/db.sqlite.BACKUP' ]; then
    echo "Creating backup"
    cp data/db.sqlite data/db.sqlite.BACKUP
    rm data/db.sqlite
fi

echo 'Migrating date'
flask migrate_data
echo 'Migration complete'
