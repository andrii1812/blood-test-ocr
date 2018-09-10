#!/usr/bin/env bash

EXPORT_COMMIT='933b92dbf4128a01d9d2c9f76d64e6d1350f001d'
IMPORT_COMMIT='933b92dbf4128a01d9d2c9f76d64e6d1350f001d'

cp data/db.sqlite data/db.sqlite.backup

git checkout $EXPORT_COMMIT

flask export_data

rm    data/db.sqlite

git checkout $IMPORT_COMMIT

flask import_data

rm -r data/export

git checkout master