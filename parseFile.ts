import fs from "fs";
import path from "path";

const PATH_BASE = "../../test_cases"
const toPath = (filename: string) => path.resolve(__dirname, `${PATH_BASE}/${filename}`);

export default (filename: string) => fs.readFileSync(toPath(filename), 'utf8').split(/\r?\n/);
