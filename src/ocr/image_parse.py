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


def get_blood_test_values(lines, references):
    res = util.find_line_with_text_in_list(constants.BLOOD_TEST_START, lines)
    if not res:
        raise ValueError('failed to find start of the test table')

    index, line = res
    blood_values_lines = lines[index + 1:]
    blood_values_lines = util.clean_empty_lines(blood_values_lines)
    blood_values_lines = util.clean_signature(blood_values_lines)
    blood_values_lines = util.to_list_of_strings(blood_values_lines)
    blood_values_lines = [util.remove_junk_words(line) for line in blood_values_lines]
    blood_values_lines = [util.join_percent_or_hash(line) for line in blood_values_lines]
    blood_values_lines = [util.join_all_except_last(line) for line in blood_values_lines]
    blood_values_lines = [util.replace_long_dash(line) for line in blood_values_lines]
    blood_values_lines = [util.replace_confident_values(line, references) for line in blood_values_lines]
    blood_values_lines = [util.add_zero_values(line) for line in blood_values_lines]
    return blood_values_lines
