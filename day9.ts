import parseFile from "./parseFile";

const INPUT_FILE = "9_test.txt";
const toContents = () => parseFile(INPUT_FILE)[0].split("").map(c => parseInt(c, 10));

// puzzle assumes input length is odd
const compact = (input: number[]) => {
    let result: number[] = [];
    let start = 0;
    let end = input.length - 1;
    let spaces = 0;

    while (start < end) {
        result = result.concat(new Array(input[start]).fill(start / 2));
        spaces += input[start + 1]
        while (spaces > 0 && start < end) {
            if (input[end] > 0) {
                result.push(end / 2);
                input[end] = input[end] - 1;
                spaces --;
            } else {
                end -= 2;
            }
        }
        start += 2;
   }
   if (input[end] > 0 && start === end) {
    result = result.concat(new Array(input[end]).fill(end / 2));
   }
    
    return result;
};

const checksum = (array: number[]) =>
    array.reduce((acc, curr, i) => acc + curr * i, 0);


// ***** PART 1 *****
// checksum(compact(toContents()));

// eg indexSum(10, 2, 5) is sum of index * 2, 
// where index starts as 10 and increments for each term in the sum
const indexSum = (startIndex: number, value: number, quantity: number) =>
    value * (quantity * startIndex + quantity * (quantity - 1)/2)

// index: sum of preceding values 
const toIndexMap = (input: number[]) => {
    let map: {[key: number]: number} = {'0': 0};

    let counter = 0
    for (let i = 0; i < input.length; i += 1) {
        map[i] = counter;
        counter += input[i];
    }

    return map;
};

const fileMoveChecksum = (input: number[]) => {
    let mutableInput = [...input];
    let result = 0;
    let indexMap = toIndexMap(input);
    let fileId = (input.length - 1) / 2;

    while (fileId > 0) {
        let quantity = input[fileId * 2];
        let spaceIndex = mutableInput.findIndex((num, i) => 
            i%2 === 1 && i < fileId * 2 && num >= quantity
        );

        let startIndex = spaceIndex === -1
            ? indexMap[fileId * 2]
            : indexMap[spaceIndex] + (input[spaceIndex] - mutableInput[spaceIndex]);

        result += indexSum(startIndex, fileId, quantity);

        if (spaceIndex !== -1) {
            mutableInput[spaceIndex] = mutableInput[spaceIndex] - quantity;
        }

        fileId--;
    }

    return result;
};

// ***** PART 2 *****
fileMoveChecksum(toContents());
