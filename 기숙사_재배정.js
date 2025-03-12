const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const T = Number(input.shift())
const dp = Array(21).fill(0n)

dp[0] = 0n;
dp[1] = 0n;
dp[2] = 1n;

for (let i = 3; i <= 20; ++i) {
    dp[i] = BigInt(i - 1) * (dp[i - 2] + dp[i - 1])
}
for (let i = 0; i < T; ++i) {
    const N = Number(input[i])
    console.log(String(dp[N]))
}