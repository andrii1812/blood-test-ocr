import os
import pickle
from collections import namedtuple

import logging

from PIL import Image

from ocr import constants
from ocr.util import log_lines, find_line_with_text_in_list
from . import tooling
from . import image_parse

Tests = namedtuple('Tests', ['date', 'values'])


def parse_image(image, references):
    tool = tooling.get_available_tool()
    lines = image_parse.get_lines_bounding_boxes(tool, image)
    log_lines(lines)
    date = image_parse.get_date(lines, image.size)
    tests = image_parse.get_blood_test_values(lines, references)

    return Tests(date, tests)


def test():
    logging.basicConfig(level=logging.DEBUG)
    image = Image.open('data/uploads/images/15332245560004801100423587202215.jpg')
    if not os.path.exists('dump.pickle'):
        tool = tooling.get_available_tool()
        lines = image_parse.get_lines_bounding_boxes(tool, image)
        with open('dump.pickle', 'wb') as file:
            pickle.dump(lines, file)
    else:
        with open('dump.pickle', 'rb') as file:
            lines = pickle.load(file)

    log_lines(lines)
    date = image_parse.get_date(lines, image.size)
    print(date)
