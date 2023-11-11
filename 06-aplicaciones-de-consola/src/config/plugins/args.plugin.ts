import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export const argv = yargs(hideBin(process.argv))
  .option("b", {
    alias: "base",
    type: "number",
    demandOption: true,
    describe: "Multiplication table base",
  })
  .option("l", {
    alias: "limit",
    default: 10,
    type: "number",
    describe: "Multiplication table limit",
  })
  .option("s", {
    alias: "show",
    default: false,
    type: "boolean",
    describe: "Show multiplication table",
  })
  .option("n", {
    alias: "name",
    type: "string",
    default: "multiplication-table",
    describe: "File name",
  })
  .option("d", {
    alias: "destination",
    type:'string',
    default:'outputs',
    describe:'File destination path'
  })
  .check((argv, options) => {
    if (argv.b < 1) throw Error("Error: base must be a positive number");
    return true;
  })
  .parseSync();
