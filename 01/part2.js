const fs = require("fs");
const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const alpha = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]

const stdinBuffer = fs.readFileSync(process.stdin.fd);
const input = stdinBuffer.toString();
const rows = input.split("\n");

var results = 0
rows.forEach(row => {
    if (row === '') return;

    let indices = [];
    alpha.forEach((a, i) => {
        const res = findIndices(row, a);

        res.forEach(element => {
            const digit = digits[i]
            indices.push({ index: element, digit });
        });
    });

    digits.forEach(digit => {
        const res = findIndices(row, digit);

        res.forEach(element => {
            indices.push({ index: element, digit });
        });
    });

    indices.sort((a, b) => a.index - b.index);

    let first = indices[0]
    let last = indices[indices.length - 1]
    let num = Number(first.digit + last.digit)
    results += num;
})

console.log(results);

// Recursively finds all indices of a target string inside of an array
function findIndices(word, target, position = 0) {
    let result = [];

    const index = word.indexOf(target, position)

    if (index >= 0) {
        result.push(index);
        result.push(findIndices(word, target, index + 1));
    }

    return result.flat();
}
