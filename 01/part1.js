const fs = require("fs");
const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

// Read stdin
const stdinBuffer = fs.readFileSync(0);

const input = stdinBuffer.toString();

const rows = input.split("\n");

var results = 0

rows.forEach(row => {
    if (row == '') return;

    const arr = Array.from(row);
    const first = arr.find(el => digits.includes(el));
    const last = arr.findLast(el => digits.includes(el));

    results += Number(first + last);
});

console.log(results);
