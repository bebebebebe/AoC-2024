import { parseChunks } from "./parseFile";

const FILENAME = "17_test.txt";
const [regStr, insStr] = parseChunks(FILENAME);
let [a, b, c] = regStr.match(/\d+/g)!.map(x => parseInt(x, 10));

const A = "A", B = "B", C = "C";
const instr = insStr.match(/(\d+,?)+/)![0].split(",").map(x => parseInt(x, 10));
let reg: {[key: string]: number} = {A: a, B: b, C: c};
let point = 0;
let out: number[] = [];

const toOp = (operand: number, combo: boolean=false) => {
    if (!combo || operand < 4) return operand;
    if (operand === 4) return reg[A];
    if (operand === 5) return reg[B];
    if (operand === 6) return reg[C];
};

const evaluate = (opcode: number, operand: number) => {
    switch (opcode) {
        case 0:
            reg[A] = Math.floor(reg[A] / 2**toOp(operand, true)!);
            point += 2;
            break;
        case 1:
            reg[B] = reg[B] ^ operand;
            point += 2;
            break;
        case 2: 
            reg[B] = toOp(operand, true)! % 8;
            point += 2;
            break;
        case 3: // jump
            if (reg[A] === 0) point += 2;
            else point = operand;
            break;
        case 4:
            reg[B] = reg[B] ^ reg[C];
            point += 2;
            break;
        case 5: // out
            out.push(toOp(operand, true)! % 8);
            point += 2;
            break;
        case 6:
            reg[B] = Math.floor(reg[A] / 2**toOp(operand, true)!);
            point += 2;
            break;
        case 7:
            reg[C] = Math.floor(reg[A] / 2**toOp(operand, true)!);
            point += 2;
            break;
    }
};
const run = () => {
    while (point < instr.length - 1) {
        evaluate(instr[point], instr[point+1]);
    }
    console.log(out.join(","));
};

// ***** PART 1 *****
run();
