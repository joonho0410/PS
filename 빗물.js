const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [H, W] = input.shift().split(' ').map(Number)
const ary = input.shift().split(' ').map(Number)
let ans = 0;

for (let i = 1; i <= H; ++i) {
    let prev = null;
    for (let j = 0; j < ary.length; ++j) {
        if (ary[j] < i) continue;
        if (prev == null) { prev = j; continue; }
        ans += (j - prev - 1);
        prev = j;       
    }
}
console.log(ans);