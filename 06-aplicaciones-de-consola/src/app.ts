console.log(process.argv)

const [exec, program, ...args] = process.argv;

console.log(args);