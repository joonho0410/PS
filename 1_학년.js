// backTracking -> timeOut
// 20개라는 제한 -> dp로 풀이가능

const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const N = Number(input.shift())
const ary = input.shift().split(' ').map(BigInt)
const target = ary.pop();
const dp = Array.from({length: 101}, () => Array(21).fill(0n));

dp[1][ary[0]] = 1n;

for (let i = 2; i <= ary.length; ++i) {
    const cur = ary[i - 1];

    for (let j = 0n; j <= 20n; ++j) {
        if (j - cur >= 0n) dp[i][j] += dp[i - 1][j - cur]
        if (j + cur <= 20n) dp[i][j] += dp[i - 1][j + cur]
    }
}

console.log(String(dp[ary.length][target]))