const fs = require("fs");
const os = require("os");
const stdinBuffer = fs.readFileSync(process.stdin.fd);
const input = stdinBuffer.toString();
const rows = input.split(os.EOL);

const regex_pattern_num = /\d+/g;
const regex_pattern_symbol = /\*/g;

var numbers = [];
var symbols = [];
var results = 0;

function handleSymbols(matches, line_number) {
    for (const match of matches) {
        symbols.push({ ln: line_number, index: match.index, word: match[0] });
    }
}

function handleNumbers(matches, line_number) {
    for (const match of matches) {
        numbers.push({ ln: line_number, start: match.index, end: match.index + match[0].length - 1, word: match[0], found: false });
    }
}

function checkRowForWinner(row, winner_index) {
    let results = numbers.filter((number, index) => {
        if (number.ln !== row) {
            return false;
        }

        if (number.found) {
            return false;
        }

        let found = false;

        if ((winner_index - 1 <= number.start) && (winner_index + 1 >= number.start)) {
            found = true;
        } else if ((winner_index - 1 <= number.end) && (winner_index + 1 >= number.end)) {
            found = true;
        }

        // if (found) {
        //     numbers[index].found = true;
        // }

        return found;
    });

    return results;
}

rows.forEach((row, index) => {
    if (row == '') return;

    const num_results = [...row.matchAll(regex_pattern_num)];
    const sym_results = [...row.matchAll(regex_pattern_symbol)];

    handleSymbols(sym_results, index + 1);
    handleNumbers(num_results, index + 1);
});

console.log({ symbols });

symbols.forEach(symbol => {
    let above_results = []
    let inline_results = []
    let below_results = []
    let total_results = []

    if (symbol.ln === 1) {
        // First line, dont check above
        inline_results = checkRowForWinner(symbol.ln, symbol.index);
        below_results = checkRowForWinner(symbol.ln + 1, symbol.index);
    } else if (symbol.ln >= rows.length - 1) {
        // Last line, don't check below
        above_results = checkRowForWinner(symbol.ln - 1, symbol.index);
        inline_results = checkRowForWinner(symbol.ln, symbol.index);
    } else {
        // Normal checking
        above_results = checkRowForWinner(symbol.ln - 1, symbol.index);
        inline_results = checkRowForWinner(symbol.ln, symbol.index);
        below_results = checkRowForWinner(symbol.ln + 1, symbol.index);
    }

    console.log({ above_results, inline_results, below_results });

    above_results.forEach(el => total_results.push(el.word));
    inline_results.forEach(el => total_results.push(el.word));
    below_results.forEach(el => total_results.push(el.word));

    if (total_results.length === 2) {
        results += Number(total_results[0] + total_results[1]);
        // total_results.forEach(res => {
        //     results += Number(res);
        // });
    }

});

console.log(results);
