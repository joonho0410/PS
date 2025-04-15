const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const max = 100001
const div = 1000000009
const dp = Array.from({length : 2 }, () => Array(max).fill(0)) // odd, even

const T = Number(input.shift())
dp[0][1] = 1; dp[1][1] = 0;
dp[0][2] = 1; dp[1][2] = 1;
dp[0][3] = 2; dp[1][3] = 2;

for (let i = 4; i < max; ++i) {
    dp[0][i] += (dp[1][i - 1] + dp[1][i - 2] + dp[1][i - 3]) % div
    dp[1][i] += (dp[0][i - 1] + dp[0][i - 2] + dp[0][i - 3]) % div
}

for (let i = 0; i < T; ++i) {
    const N = Number(input[i])
    console.log(dp[0][N], dp[1][N])
}
