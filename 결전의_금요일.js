const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const N = Number(input.shift())
const ary = input.shift().split(' ').map((e) => e % 7)

let day = new Set();
day.add(0)
let ans = false;

for (e of ary) {
    const temp = new Set();
    for (d of day) {
        temp.add((d + e) % 7);
        if (((d + e) + 3) % 7 === 0) ans = true; 
    }
    if (ans) break;
    for (t of temp) day.add(t)
}

ans ? console.log("YES") : console.log("NO")
