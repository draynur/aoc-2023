const fs = require("fs");
const os = require("os");
const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const DIGITS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const stdinBuffer = fs.readFileSync(process.stdin.fd);
const input = stdinBuffer.toString();
const rows = input.split(os.EOL);

function findIndices(word, target, position = 0) {
    let result = [];

    const index = word.indexOf(target, position)

    if (index >= 0) {
        result.push(index);
        result.push(findIndices(word, target, index + 1));
    }

    return result.flat();
}

var results = 0;
rows.forEach(row => {
    if (row === '') return;

    let indices = [];

    function findNumbersInRow(numbers, row) {
        numbers.forEach((number, i) => {
            const found_indices = findIndices(row, number);

            found_indices.forEach(index => {
                indices.push({ index, digit: digits[i] });
            });
        });
    }

    findNumbersInRow(DIGITS, row);
    findNumbersInRow(digits, row);

    indices.sort((a, b) => a.index - b.index);

    const first = indices[0];
    const last = indices[indices.length - 1];
    const num = Number(first.digit + last.digit);

    results += num;
})

console.log(results);
