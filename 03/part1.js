const fs = require("fs");
const os = require("os");
const stdinBuffer = fs.readFileSync(process.stdin.fd);
const input = stdinBuffer.toString();
const rows = input.split(os.EOL);

const regex_pattern_before = /[^a-zA-Z0-9_\.]\d+/g;
const regex_pattern_after = /d+[^a-zA-Z0-9_\.]/g;

const regex_strip = /[^\d]/g;

var results = 0;

function logMatches(matches) {
    for (const match of matches) {
        console.log(
            `Found ${match[0]} start=${match.index} end=${match.index + match[0].length}.`,
        );
        let found = match[0];
        let answer = found.replace(regex_strip, '');

        console.log({ answer });
    }
}

rows.forEach(row => {
    if (row == '') return;

    const before_results = [...row.matchAll(regex_pattern_before)];
    const after_results = [...row.matchAll(regex_pattern_after)];
    logMatches(before_results);
    logMatches(after_results);
});
