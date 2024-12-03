import fs from "fs";
import path from "path";

const PATH_BASE = "../../test_cases"
const toPath = (filename: string) => path.resolve(__dirname, `${PATH_BASE}/${filename}`);
const toContents =  (filename: string) => fs.readFileSync(toPath(filename), 'utf8');

const REGEX_MUL = /mul\(([0-9]*),([0-9]*)\)/g;
const REGEX_CLEAN = /don't\(\)[\s\S]*?do\(\)/g;
const REGEX_CLEAN_END = /don't\(\).*$/g;

// given a string, find patterns mul(x,y)
// return sum of x*y for all such patterns in string
const evalCorrupted = (input: string) => {
    let matches = [...input.matchAll(REGEX_MUL)];
    let products = matches.map(match => parseInt(match[1], 10) * parseInt(match[2], 10));
    return products.reduce((acc, curr) => acc + curr, 0);
};

// remove parts of string after "don't()" substring until "do()" substring
const cleanString = (input: string) => input.replace(REGEX_CLEAN, "").replace(REGEX_CLEAN_END, "");

// *** PART 1 ***
const evalFile = (filename: string) => evalCorrupted(toContents(filename));

// *** PART 2 ***
const evalCleanedFile = (filename: string) => evalCorrupted(cleanString(toContents(filename)));
