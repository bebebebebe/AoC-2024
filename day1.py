def read_file(path):
    pairs = []
    with open(path, "r") as file:
        for line in file:
            pairs.append(line.split())
    return pairs

def to_distance(pairs):
    list1 = sorted([int(x[0]) for x in pairs])
    list2 = sorted([int(x[1]) for x in pairs])
    dists = [abs(pair[0] - pair[1]) for pair in zip(list1, list2)]
    return sum(dists)

def to_total_dist(filepath):
    return to_distance(read_file(filepath))

print(to_total_dist("./locationIds.txt"))

def to_similarity(pairs):
    result = 0
    lookup = {}
    list1 = [int(x[0]) for x in pairs]
    list2 = [int(x[1]) for x in pairs]
    for n in list2:
        if n in lookup:
            lookup[n] += 1
        else:
            lookup[n] = 1
    for n in list1:
        factor = lookup[n] if n in lookup else 0
        result += factor * n
    return result

def print_sim_score(filepath):
    print(to_similarity(read_file(filepath)))
