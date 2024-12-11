import parseFile from "./parseFile";

const INPUT_FILE = "10_test.txt";
const toContents = () => parseFile(INPUT_FILE).map(
    line => line.split("").map(c => parseInt(c, 10))
);


type Position = [number, number];

const nextPos = (grid: number[][], p: Position) => {
    let result: Position[] = [];
    let [i, j] = p;

    // Right
    i+1 < grid.length && result.push([i+1, j]);
    // Left
    i > 0 && result.push([i-1, j]);
    // UP
    j > 0 && result.push([i, j-1]);
    // DOWN
    j+1 < grid[0].length && result.push([i, j+1]);

    return result.filter(([a, b]) => grid[a][b] === grid[i][j] + 1);
};

const countPathsFromPos = (grid: number[][], p: Position, isRating: boolean=false) => {
    let count = 0;
    let queue = [p];

    while (queue.length > 0) {
        let [i, j] = queue.shift()!;
        if (grid[i][j] === 9) {
            count++;
            // only find a given 9 again if using "rating" method
            // otherwise hide the 9 by changing it to something else
            !isRating && (grid[i][j] = 10);
        } else {
            queue = [...queue, ...nextPos(grid, [i, j])];
        }
    }
    
    return count;
};

const countPaths = (grid: number[][], isRating: boolean=false) => {
    let result = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 0) {
                let copy = grid.map(a => [...a]);
                let sum = countPathsFromPos(copy, [i, j], isRating);
                result += sum;
            }
        }
    }
    return result;
};

// ***** PART 1 *****
countPaths(toContents());

// ***** PART 2 *****
countPaths(toContents(), true);
