const fs = require("fs");
const stdinBuffer = fs.readFileSync(process.stdin.fd);
const input = stdinBuffer.toString();
const rows = input.split("\n");

const num_regex = /\d+/g;

var results = 0

rows.forEach(row => {
    if (row == '') return;

    let reward = 0;
    let winning_numbers = [];

    const [left, right] = row.split(":");

    const [winners, found] = right.split("|");



    for (const winner of winners.matchAll(num_regex)) {
        winning_numbers.push(winner[0]);
    }

    for (const num of found.matchAll(num_regex)) {
        if (winning_numbers.includes(num[0])) {
            reward += 1;
        }
    }

    if (reward) {
        results += Math.pow(2, reward - 1);
    }
});

console.log(results);
