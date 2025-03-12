const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const N = Number(input.shift());
const mod = 1000000000;
const dp = Array.from({length: N + 1}).fill(0)

dp[0] = 0;
dp[1] = 0;
dp[2] = 1;

for (let i = 3; i <= N; ++i) {
    dp[i] = (i - 1) * (dp[i - 2] + dp[i -1]) % mod
}

console.log(dp[N])