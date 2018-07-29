#! /bin/sh
BUILD_PATH="$(realpath "../src/web/static/")"

chmod +x "$BUILD_PATH/build-fresh.sh"
echo $BUILD_PATH
docker build -f Dockerfile.build -t ocr-frontend-build .
docker run -it -v $BUILD_PATH:/app ocr-frontend-build