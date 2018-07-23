from collections import namedtuple

from . import tooling
from . import image_parse

Tests = namedtuple('Tests', ['date', 'values'])


def parse_image(image):
    tool = tooling.get_available_tool()
    lines = image_parse.get_lines_bounding_boxes(tool, image)
    date = image_parse.get_date(lines)
    tests = image_parse.get_blood_test_values(lines)

    return Tests(date, tests)
