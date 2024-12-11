import parseFile from "./parseFile";
const INPUT_FILE = "11_test.txt";

// ***********************************************************
// MEMOIZED SOLUTION. SEE BELOW FOR SUPER SLOW NAIVE SOLUTION.
// ***********************************************************

function getInput() {
    return parseFile(INPUT_FILE)[0].split(" ").map(c => parseInt(c, 10));
}

type Memo = Map<string, number>;

const toKey = (stone: number, blinks: number) => JSON.stringify([stone, blinks]);

function numStones(stone: number, blinks: number, memo: Memo = new Map()): number {
    if (memo.has(toKey(stone, blinks))) {
        return memo.get(toKey(stone,blinks)) as number;
    }

    if (blinks === 0) {
        memo.set(toKey(stone, blinks), 1);
        return 1;
    }

    if (stone === 0) {
        
        memo.set(toKey(stone, blinks), numStones(1, blinks - 1, memo));
        return numStones(1, blinks - 1, memo);
    }

    if (stone.toString().length % 2 === 0) {
        let [a, b] = splitStone(stone);
        memo.set(
            toKey(stone, blinks), 
            numStones(a, blinks - 1, memo) + numStones(b, blinks - 1, memo)
        );
        return numStones(a, blinks - 1, memo) + numStones(b, blinks - 1, memo);
    }

    memo.set(toKey(stone, blinks), numStones(stone * 2024, blinks - 1, memo));
    return numStones(stone * 2024, blinks - 1, memo);
}

function totalStones(stones: number[], blinks: number) {
    return stones.map(stone => numStones(stone, blinks)).reduce((a,b) => a+b, 0);
}

// ***** PART 1 *****
totalStones(getInput(), 25);

// ***** PART 2 *****
totalStones(getInput(), 75);

function splitStone(stone: number) {
    let str = stone.toString();
    let half = str.length / 2;
    return [
        parseInt(str.slice(0, half), 10), 
        parseInt(str.slice(half), 10)
    ]
}

// *************************************************************
// NAIVE SOLUTION BELOW. SEE ABOVE FOR FASTER MEMOIZED SOLUTION.
// *************************************************************

function toContents() {
    return parseFile(INPUT_FILE)[0].split(" ");
}

function replace(stone: string) {
    if (stone === "0") {
        return ["1"];
    } else if (stone.length % 2 == 0) {
        return [
            stone.slice(0, stone.length / 2).replace(/^0+/, "") || "0",
            stone.slice(stone.length / 2).replace(/^0+/, "") || "0"
        ];
    } else {
        return [(2024 * parseInt(stone, 10)).toString()]
    }
}

function step(stones: string[]) {
    let result = [...stones];
    for (let i = 0; i < stones.length; i++) {
        result.shift();
        result = [...result, ...replace(stones[i])];
    }
    return result;
}

function applyMultipleTimes(fn: (stones: string[]) => string[], times: number, start: string[]) { 
    return new Array(times).fill(start).reduce(fn, start);
}

function countStones(stones: string[], times: number) {
    return applyMultipleTimes(step, times, stones).length
}

// ***** PART 1 *****
countStones(toContents(), 25);

// ***** PART 2 *****
countStones(toContents(), 75); 
