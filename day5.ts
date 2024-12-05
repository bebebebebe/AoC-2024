import parseFile from "./parseFile";

const FILENAME = "5_test.txt";

const parseQueue = (filename: string) => {
    const lines = parseFile(filename);
    const i = lines.indexOf("");
    return {
        rules: lines.slice(0, i).map(rule => rule.split("|").map(x => parseInt(x, 10))),
        pages: lines.slice(i + 1).map(pageSeq => pageSeq.split(",").map(x => parseInt(x, 10)))
    };
};

type RuleMap = Map<number, Set<number>>;
type Rule = [number, number];
type PageSeq = number[];

const hash = (rules: Rule[]): RuleMap => {
    let map = new Map();
    rules.forEach(([a, b]) => map.set(a, map.has(a) ? map.get(a).add(b) : new Set([b])));

    return map;
};

const isCorrect = (ruleMap: RuleMap, pageSeq: PageSeq) => {
    for (let i = 0; i<pageSeq.length -1; i++) {
        let allowedNext = ruleMap.get(pageSeq[i]);
        if (allowedNext === undefined) return false;
        if (!new Set(pageSeq.slice(i+1)).isSubsetOf(allowedNext)) return false
    }
    return true;
};

const middle = (array: number[]) => array[Math.floor(array.length / 2)];

// ***** PART 1 *****
const countCorrectMiddles = () => {
    let {rules, pages} = parseQueue(FILENAME);
    let ruleMap = hash(rules as [number, number][]);

    return pages.map(pageSeq => isCorrect(ruleMap, pageSeq) ? middle(pageSeq) : 0)
        .reduce((a, b) => a + b, 0);
}

const toPageSort = (map: RuleMap) => (a: number, b: number)  => {
    if (map.has(a) && map.get(a)?.has(b)) {
        return -1;
    } else if (map.has(b) && map.get(b)?.has(a)) {
        return 1;
    } else {
    return 0;
    }
};

// ***** PART 2 *****
const countSortedMiddles = () => {
    let {rules, pages} = parseQueue(FILENAME);
    let ruleMap = hash(rules as [number, number][]);
    let pageSort = toPageSort(ruleMap);

    return pages.map(pageSeq => !isCorrect(ruleMap, pageSeq) ? middle(pageSeq.sort(pageSort)) : 0)
        .reduce((a, b) => a + b, 0);
};
