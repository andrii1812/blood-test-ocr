import re
import Levenshtein as Lev
import logging

from ocr import constants


def is_float(text):
    try:
        float(text)
        return True
    except ValueError:
        return False


def test_for_regex(boxes, regex):
    for box in boxes:
        m = re.match(regex, box.content)
        if m:
            return box


def get_date(boxes):
    return test_for_regex(boxes, constants.DATE_REGEX)


def find_line_with_text(text, lines):
    for i, line in enumerate(lines):
        for word_box in line.word_boxes:
            if word_box.content == text:
                return i, line


def clean_empty_lines(lines):
    for line in lines:
        if not line.content == '':
            yield line


def clean_signature(lines):
    for line in lines:
        if Lev.distance(line.content, constants.SIGNATURE_TEXT) > constants.SIGNATURE_TEXT_THRESHOLD:
            yield line


def to_list_of_strings(lines):
    for line in lines:
        yield [word.content for word in line.word_boxes]


def remove_junk_words(line):
    def removing_gen():
        for i, word in enumerate(line):
            is_junk_word = False
            for junk_word in constants.JUNK_WORDS:
                if Lev.distance(word, junk_word) <= constants.JUNK_WORD_THRESHOLD \
                        and i > 0 \
                        and not is_float(word) \
                        and not (i == 1 and word in constants.PERCENT_OR_HASH):
                    is_junk_word = True
                    break
            if is_junk_word:
                continue
            yield word

    return list(removing_gen())


def join_all_except_last(line):
    def join_gen():
        last = line[-1]
        if is_float(last):
            other = line[:-1]
            yield ' '.join(other)
            yield last
        else:
            yield ' '.join(line)

    return list(join_gen())


def add_zero_values(line):
    if len(line) < 2:
        line.append(0.0)
    return line


def log_lines(lines):
    boxes = [l.word_boxes for l in lines]
    text = '\n'.join([', '.join([('"' + b.content + '"') for b in bl]) for bl in boxes])
    logging.debug(text)


def find_line_with_text_in_list(reference_list, lines):
    for i, line in enumerate(lines):
        for box in line.word_boxes:
            if any(map(lambda x: box.content == x, reference_list)):
                return i, line


def join_percent_or_hash(line):
    index = -1
    found_word = None
    for i, word in enumerate(line):
        if word in constants.PERCENT_OR_HASH:
            index = i
            found_word = word
            break

    if index == -1 or index == 0:
        return line

    line.remove(found_word)
    line[index - 1] += found_word
    return line


def replace_long_dash(line):
    word = line[0]
    word = word.replace('\u2014', '-')
    line[0] = word
    return line


def replace_confident_values(line, references):
    word = line[0]

    for ref in references:
        if 1 - Lev.distance(word, ref) / len(ref) > constants.CONFIDENCE:
            word = ref
            break

    line[0] = word
    return line


def pipeline(actions, values):
    for action in actions:
        values = action(values)
    return values


def for_word(action):
    def inner(lines):
        return [action(line) for line in lines]
    return inner
