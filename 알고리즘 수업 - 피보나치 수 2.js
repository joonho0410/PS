const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const div = 1000000007;
const T = Number(input.shift())

const dp = [1, 1]
dp[1] = 1;
dp[2] = 1;
for (let i = 3; i <= T; ++i) {
    let next = dp[0] + dp[1] > div ? dp[0] + dp[1] - div : dp[0] + dp[1]
    dp[0] = dp[1];
    dp[1] = next;
}

console.log(dp[1], T - 2)
