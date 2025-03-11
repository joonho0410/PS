const fs = require('fs')
const input = fs.readFileSync(0).toString().trim()

const [d1, d2] = input.split(' ').map(Number)
const dp = Array(2001 * 2001).fill(false)// 
let ans = 0;

for (let s = d1; s <= d2; ++s) {
    for (let i = 0; i < s; ++i) {
        const up = i;
        const down = s;
        const div = uclid(up, down);
        const key = (down / div) * 2001 + (up / div)
        if (dp[key]) continue;
        dp[key] = true;
        ++ans
    }
}

console.log(ans)
function uclid(a, b) {
    const r = a % b
    if (r == 0) return b;
    return uclid(b, r);
}