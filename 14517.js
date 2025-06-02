const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const str = input.shift().split('')
const MOD = 10007;
const dp = Array.from({length : str.length}, () =>
    Array(str.length).fill(0)
)

for (let i = 0; i < str.length; ++i) dp[i][i] = 1;
for (let i = 0; i + 1 < str.length; ++i) {
    if (str[i] === str[i + 1]) dp[i][i + 1] = 3;
    else dp[i][i + 1] = 2;
}

for (let len = 2; len < str.length; ++len) {
    for (let s = 0; s + len < str.length; ++s) {
        const mid = (dp[s][s + len - 1] + dp[s + 1][s + len] - dp[s + 1][s + len - 1] + MOD) % MOD
        if (str[s] === str[s + len]) dp[s][s + len] = mid + dp[s + 1][s + len - 1] + 1;
        else dp[s][s + len] = mid;

        dp[s][s + len] %= MOD
    }
}

console.log(dp[0][str.length - 1])
