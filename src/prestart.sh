if [ ! -d "data/uploads/images" ]; then
    mkdir data/ data/uploads data/uploads/images
fi

python setup_db.py

