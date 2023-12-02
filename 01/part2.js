const fs = require("fs");
const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const alpha = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const stdinBuffer = fs.readFileSync(process.stdin.fd);
const input = stdinBuffer.toString();
const rows = input.split("\n");
var results = 0

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

rows.forEach(row => {
    if (row === '') return;

    let indices = [];
    alpha.forEach((a, i) => {
        const found_indices = findIndices(row, a);

        found_indices.forEach(index => {
            const digit = digits[index];
            indices.push({ index, digit });
        });
    });

    digits.forEach(digit => {
        const found_indices = findIndices(row, digit);

        found_indices.forEach(index => {
            const digit = digits[index];
            indices.push({ index, digit });
        });
    });

    indices.sort((a, b) => a.index - b.index);

    const first = indices[0];
    const last = indices[indices.length - 1];
    const num = Number(first.digit + last.digit);
    results += num;
})

console.log(results);