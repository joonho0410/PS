const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const T = Number(input.shift())

const dp = Array.from({length : 65}, () => Array(10).fill(1))

for (let i = 2; i <= 64; ++i){
    for (let j = 0; j < 10; ++j) {
        dp[i][j] = 0;
        for (let k = 0; k <=j; ++k){
            dp[i][j] += dp[i - 1][k]
        }
    }
}

for (let i = 0; i < T; ++i) {
    const N = Number(input[i])
    let ans = 0;
    for (let i = 0; i < 10; ++i) {
        ans += dp[N][i]
    }
    console.log(ans)
}