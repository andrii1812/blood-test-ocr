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
    line = None
    for start in constants.DATE_LINES:
        if line:
            break
        _, line = util.find_line_with_text(start, lines)

    if not line:
        raise ValueError('date line not found')

    date = util.get_date(line.word_boxes)
    return date.content


def get_blood_test_values(lines, references):
    res = util.find_line_with_text_in_list(constants.BLOOD_TEST_START, lines)
    if not res:
        raise ValueError('failed to find start of the test table')

    index, line = res
    blood_values_lines = lines[index + 1:]

    return util.pipeline(
        [
            util.clean_signature,
            util.to_list_of_strings,
            util.for_line(util.remove_junk_words),
            util.for_line(util.join_percent_or_hash),
            util.for_line(util.join_all_except_last),
            util.for_line(util.replace_long_dash),
            util.for_line(lambda x: util.replace_confident_values(x, references)),
            util.remove_empty_entries,
            util.for_line(util.add_zero_values),
        ],
        blood_values_lines
    )
