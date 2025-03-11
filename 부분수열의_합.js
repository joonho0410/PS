const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const N = Number(input.shift())
const ary = input.shift().split(' ').map(Number)
const set = new Set();

for (let len = 1; len <= N; ++len) {
    recur(0, 0, 0, len);
}
const ans = [...set].sort((a, b) => a - b)
let idx = 0;
let s = 1;
while (ans.length > idx) {
    const cur = ans[idx++]
    if (cur != s) break;
    s++;
}
console.log(s)

function recur(idx, sum, len, target) {
    if (len === target) {
        set.add(sum);
        return ;
    }
    if (idx >= N) return ;
    recur(idx + 1, sum + ary[idx], len + 1, target)
    recur(idx + 1, sum, len, target);
}