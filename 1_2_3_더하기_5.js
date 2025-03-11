const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const T = Number(input.shift())

const dp = Array.from({length : 4}, () => 
        Array(100001).fill(0)
    )

dp[1][1] = 1;
dp[2][2] = 1;
dp[1][3] = 1; dp[2][3] = 1; dp[3][3] = 1;

for (let i = 4; i <= 100000; ++i) {
    dp[1][i] = i - 1 < 0 ? 0 : (dp[2][i - 1] + dp[3][i - 1]) % 1000000009
    dp[2][i] = i - 2 < 0 ? 0 : (dp[1][i - 2] + dp[3][i - 2]) % 1000000009
    dp[3][i] = i - 3 < 0 ? 0 : (dp[1][i - 3] + dp[2][i - 3]) % 1000000009
}

for (let i = 0; i < T; ++i) {
    const N = Number(input.shift()) 

    console.log((dp[1][N] + dp[2][N] + dp[3][N]) % 1000000009)
}
