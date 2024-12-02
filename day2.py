def read_file(path):
    lists = []
    with open(path, "r") as file:
        for line in file:
            lists.append([int(n) for n in line.split()])
    return lists

def is_step_up(a, b):
     return b - a >= 1 and b - a <= 3

# assumes lists have at least 2 elements
def is_safe(list):
    is_inc = list[1] > list[0]
    for i in range(1, len(list)):
        a, b = list[i - 1], list[i]
        if (is_inc and not is_step_up(a, b)) or (not is_inc and not is_step_up(b, a)):            
            return False
    return True

# assumes lists have at least 3 elements
def is_safe_dampener(list):
    for i in range(len(list)):
        if is_safe(list[:i] + list[(i+1):]):
            return True
    return False

def safety_count(reports):
    return sum(is_safe(report) for report in reports)

def safety_count_dampener(reports):
    return sum(is_safe_dampener(report) for report in reports)

def print_safety_count(path):
    reports = read_file(path)
    print(safety_count(reports))

def print_safety_count_dampener(path):
    reports = read_file(path)
    print(safety_count_dampener(reports))