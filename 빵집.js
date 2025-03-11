const fs = require('fs')
const input = fs.readFileSync(0).toString().trim()
const [N, K] = input.split(' ').map(Number)
const dp = Array.from({length : N + 1}, () => Array(K + 1).fill(0))

for (let i = 0; i <= N; ++i){
    dp[i][1] = 1;
}

for (let k = 2; k <= K; ++k) {
    for (let i = N; i >= 0; --i) {
        for (let j = 0; j <= N; ++j){
            if (i - j < 0) break;
            dp[i][k] += dp[i - j][k - 1];
            dp[i][k] %= 1000000000;
        }
    }
}
console.log(dp[N][K])