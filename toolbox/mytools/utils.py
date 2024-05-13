import re


def split_xy(input_string):
    # First, split the string around the arrow '->' allowing for optional spaces around it
    parts = re.split(r"\s*->\s*", input_string)

    # Use regex to split on commas that may or may not be surrounded by spaces
    x_values = re.split(r"\s*,\s*", parts[0])
    y_values = re.split(r"\s*,\s*", parts[1]) if len(parts) > 1 else []

    return x_values, y_values


def split(input_string):
    return re.split(r"\s*,\s*", input_string)
