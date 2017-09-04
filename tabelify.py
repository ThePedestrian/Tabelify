# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#
# Tabelify - A simple function for printing adictionary to a table.
# 
# Copyright (c) 2017 - Uffaz Nathaniel
# 
# 
# Released under the MIT License.
# See https://opensource.org/licenses/MIT for more information. 
#
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


 def tabelify(items):
    """
    Convert an one-dimensional object or array to a tabular representation.

    :param items: Dictionary or list
    :return: Tabular representation in string form
    """

    SEPERATOR = "|"
    HEADER_DIVIDER = "-"

    def is_array(target):
        return (target is not None) and (isinstance(target, list))

    def is_undefined(target):
        return target is None

    def safe_get(dict, key):
        if key not in dict:
            return None
        return dict[key]

    def get_max_column_length():
        max_lengths = {}
        for item in items: # iterate over items
            for key in item: # iterate over each field
                val = item[key]
                length = 0 if is_undefined(val) else len(str(val))
                key_length = len(key)
                if key_length > length:
                    length = key_length
                if is_undefined(safe_get(max_lengths, key)):
                    max_lengths[key] = 0
                if length > max_lengths[key]:
                    max_lengths[key] = length
        return max_lengths

    # Convert to an array if dictionary is passed
    if not is_array(items):
        items = [items]

    # The maximum width of each property
    max_lengths = get_max_column_length()

    # Pad the string with whitespace
    def get_padded_str(value, property_name):
        value = "" if is_undefined(value) else str(value)
        max_length = max_lengths[property_name]
        if is_undefined(max_length) or max_length <= 0:
            max_length = len(value)
        while len(value) < max_length:
            value += " "
        return value

    header = ""
    result = ""
    is_header_set = False

    for item in items:  # iterate over items
        if not is_header_set:
            header += SEPERATOR + " "
        result += SEPERATOR + " "
        for key in max_lengths:  # iterate over each field
            if not is_header_set:
                header += get_padded_str(key, key)
                header += " " + SEPERATOR + " "
            result += get_padded_str(safe_get(item, key), key)
            result += " " + SEPERATOR + " "
        result += '\n'
        is_header_set = True

    return header + '\n' + (HEADER_DIVIDER*len(header)) + '\n' + result