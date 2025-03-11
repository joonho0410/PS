const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

let idx = 0;

while (1) {
    const cur = Number(input[idx++])
    if (cur === 0) break;
    console.log(String(findAns(cur)))
}

function findAns(N) {
    let dp = Array.from({length : N + 1} , () => Array(N + 1).fill(0n))
    dp[1][0] = 1n;
    dp[1][1] = 1n;

    for (let i = 2; i <= N; ++i) {
        for (let j = 0; j <= i; ++j) {
            const a = dp[i - 1][j];
            const b = j - 1 < 0 ? 0n : dp[i][j - 1]
            dp[i][j] = a + b
        }
    }
    return dp[N][N]
}