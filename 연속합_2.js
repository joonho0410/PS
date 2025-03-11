const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const N = Number(input.shift())
const ary = input.shift().split(' ').map(Number)
const dp = Array.from({length: ary.length}, () => [-Infinity, -Infinity])
dp[0][0] = ary[0]
dp[0][1] = ary[0]
let ans = ary[0]

for (let i = 1; i < ary.length; ++i) {
    dp[i][0] = Math.max(dp[i - 1][0] + ary[i], ary[i])
    dp[i][1] = Math.max(dp[i - 1][0], dp[i - 1][1] + ary[i])
    ans = Math.max(ans, dp[i][1], dp[i][0])
}

console.log(ans)