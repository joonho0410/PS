const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [C, N] = input.shift().split(' ').map(Number)
const ary = []
const dp = Array(2001).fill(Infinity)
dp[0] = 0;

for (let i = 0; i < N; ++i) {
    const [cost, earn] = input[i].split(' ').map(Number)
    ary.push([cost, earn])
}

for (e of ary) {
    const [cost, earn] = e;
    for (let i = 0; i + earn <= 2000; ++i) {
        if (dp[i] === Infinity) continue;
        dp[i + earn] = Math.min(dp[i] + cost, dp[i + earn]);
    }
}
let ans = Infinity
for (let i = C; i <= 2000; ++i) 
    ans = Math.min(ans, dp[i])
console.log(ans)