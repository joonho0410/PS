const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const MOD = 1000000003
const N = Number(input.shift())
const K = Number(input.shift())

let ans = 0;

let dp = Array.from({length : 2}, () =>
    Array.from({length : N}, () => 
    Array(K + 1).fill(0)
    ))

dp[1][0][1] = 1;
for (let i = 1; i < N - 1; ++i) {
    for (let cnt = 0; cnt <= K; ++cnt) {
        dp[0][i][cnt] = (dp[0][i - 1][cnt] + dp[1][i - 1][cnt]) % MOD
        dp[1][i][cnt] = cnt > 0 ? dp[0][i - 1][cnt - 1] : 0 
    }
}
for (let i = 0; i < N - 1; ++i) {
    ans = (ans + dp[1][i][K]) % MOD 
}

dp = Array.from({length : 2}, () =>
    Array.from({length : N}, () => 
    Array(K + 1).fill(0)
    ))

dp[0][0][0] = 1;
for (let i = 1; i < N; ++i) {
    for (let cnt = 0; cnt <= K; ++cnt) {
        dp[0][i][cnt] = (dp[0][i - 1][cnt] + dp[1][i - 1][cnt]) % MOD
        dp[1][i][cnt] = cnt > 0 ? dp[0][i - 1][cnt - 1] : 0 
    }
}
for (let i = 0; i < N; ++i) {
    ans = (ans + dp[1][i][K]) % MOD 
}

console.log(ans)