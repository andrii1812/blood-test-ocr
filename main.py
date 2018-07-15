from PIL import Image

import ocr


def main():
    image = Image.open('test_images/IMG_20180710_170326.jpg')
    tests = ocr.parse_image(image)
    print(tests.date)
    print(tests.values)


if __name__ == '__main__':
    main()
