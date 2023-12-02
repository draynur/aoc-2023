const fs = require("fs");
const stdinBuffer = fs.readFileSync(process.stdin.fd);
const input = stdinBuffer.toString();
const rows = input.split("\n");

var acc = 0

rows.forEach(row => {
    if (row == '') return;

    const [left, right] = row.split(": ");
    const statements = right.split("; ");
    let dict = {
        blue : 0,
        red : 0,
        green : 0
    };

    for (let index = 0; index < statements.length; index++) {
        const statement = statements[index];
        const parts = statement.split(", ");

        for (let jindex = 0; jindex < parts.length; jindex++) {
            const q = parts[jindex];
            const [num, color] = q.split(" ");
            if (Number(dict[color]) < Number(num) ) {
                dict[color] = num;
            }
        }
    }

    acc += (Number(dict.blue) * Number(dict.red) * Number(dict.green));
});

console.log(acc);
