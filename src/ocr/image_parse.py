import pyocr.builders

import ocr.util as util
from ocr import constants


def get_lines_bounding_boxes(tool, image):
    grayscale = image.convert('L')
    return tool.image_to_string(
        grayscale,
        lang="tur",
        builder=pyocr.builders.LineBoxBuilder()
    )


def get_date(lines):
    _, line = util.find_line_with_text(constants.DATE_LINE_START, lines)
    date = util.get_date(line.word_boxes)
    return date.content


def get_blood_test_values(lines):
    index, line = util.find_line_with_text(constants.BLOOD_TEST_START, lines)
    blood_values_lines = lines[index + 1:]
    blood_values_lines = util.clean_empty_lines(blood_values_lines)
    blood_values_lines = util.clean_signature(blood_values_lines)
    blood_values_lines = util.to_list_of_strings(blood_values_lines)
    blood_values_lines = [util.remove_junk_words(line) for line in blood_values_lines]
    blood_values_lines = [util.join_all_except_last(line) for line in blood_values_lines]
    blood_values_lines = [util.add_zero_values(line) for line in blood_values_lines]
    return blood_values_lines
