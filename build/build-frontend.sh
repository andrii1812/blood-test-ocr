docker build -f Dockerfile.build -t ocr-frontend-build .
docker run --rm -v "../src/web/static":/app ocr-frontend-build