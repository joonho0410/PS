const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [N, K] = input.shift().split(' ').map(Number)
const dp = Array(N + 1).fill(0)

dp[0] = 1;

for (let i = 1; i <= N; ++i) {
    for (let j = 1; j <= 3; ++j) {
        if (i - j < 0) continue;
        dp[i] += dp[i - j]
    }
}

if (dp[N] < K) {
    console.log(-1)
    return ;
}

const ans = []
recur(N, K)
console.log(ans.join('+'))

function recur(n, k) {
    if (k == 0 || n == 0 ) return ;
    let idx = 1;
    while (1) {
        if (k <= dp[n - idx]) break;
        k -= dp[n - idx];
        ++idx;
    }
    ans.push(idx);
    recur(n - idx, k)
}