const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const N = Number(input.shift())
const ary = [0, ...input.map(Number)];
const dp = Array(N + 1).fill(0);

let max = 0
for (let i = 1; i <= N; ++i) {
    const cur = ary[i];
    for (let j = 0; j < cur; ++j){
        dp[cur] = Math.max(dp[j] + 1, dp[cur])
    }
    max = Math.max(dp[cur], max);
}

console.log(N - max)