const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [K, N] = input.shift().split(' ').map(Number)
const dp = Array.from({length : 64}, () => 
    Array(201).fill(0n))

//dp[자리수][현재위치] = 해당하는 갯수

const start = K - 1;
dp[0][start] = 1n;
for (let i = 1; i <= N; ++i) {
    for (let j = 0; j <= 200; ++j) {
        if (j - 1 >= 0) dp[i][j] += dp[i - 1][j - 1]
        if (j + 1 < 200) dp[i][j] += dp[i - 1][j + 1] 
    }
} 

let ans = 0n;
for (let j = 0; j <= 200; ++j) {
    ans += dp[N][j]
}

console.log(String(ans))