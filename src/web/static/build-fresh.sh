
echo "[build] cleaning before build"
rm -rf node_modules/
rm -rf .cache/
rm -rf dist/

echo "[build] building to /dist"
yarn install
npm rebuild node-sass
yarn build

echo "[build] removing build artifacts"
rm -rf node_modules/
rm -rf .cache/
