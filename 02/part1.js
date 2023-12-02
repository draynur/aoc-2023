const fs = require("fs");
const stdinBuffer = fs.readFileSync(process.stdin.fd);
const input = stdinBuffer.toString();
const rows = input.split("\n");
const dict = {
    red: 12,
    green: 13,
    blue: 14
}

var acc = 0

rows.forEach(row => {
    if (row == '') return;

    const [left, right] = row.split(": ");
    const statements = right.split("; ");

    let flag = true;
    let breakout = false; 

    for (let index = 0; index < statements.length; index++) {
        const statement = statements[index];
        const parts = statement.split(", ");
        for (let jindex = 0; jindex < parts.length; jindex++) {
            const q = parts[jindex];
            const [num, color] = q.split(" ");

            if (num > dict[color]) {
                flag = false;
                breakout = true;
                break;
            }
        }

        if (breakout) break; 
    }

    if (flag) {
        const [game, id] = left.split(" ");
        acc += Number(id);
    }
});

console.log(acc);
