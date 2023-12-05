const fs = require("fs");
const util = require("util");
const stdinBuffer = fs.readFileSync(process.stdin.fd);
const input = stdinBuffer.toString();
const rows = input.split("\n");
const num_regex = /\d+/g;
var cards = [];

rows.forEach((row, index) => {
    if (row == '') return;

    let reward = 0;
    let winning_numbers = [];
    let numbers = []

    const [left, right] = row.split(":");

    const [winners, found] = right.split("|");

    for (const winner of winners.matchAll(num_regex)) {
        winning_numbers.push(winner[0]);
    }

    for (const num of found.matchAll(num_regex)) {
        numbers.push(num[0]);
    }

    cards.push({
        numbers,
        winning_numbers,
        index,
        count: 0,
        winner: false
    });
});

cards.forEach((card, index) => {
    let wins = 0;
    card.winning_numbers.forEach(win => {
        if (card.numbers.includes(win)) {
            cards[index].winner = true;
            wins++;
        }
    });

    if (wins) {
        for (let i = index; (i <= index + wins) && (i < cards.length - 1); i++) {
            cards[i].count += 1;
        }
    }
});

const result = cards.reduce((previous, current) => {
    return previous + current.count + 1;
}, 0)

console.log(util.inspect({ cards: cards.splice(cards.length - 10) }, false, null, true))
