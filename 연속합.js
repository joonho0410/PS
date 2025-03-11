const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const N = Number(input.shift())
const ary = input.shift().split(' ').map(Number)
const dp = Array(N + 1).fill(-1001);

let max = -1001
for (let i = 0; i < ary.length; ++i){
    dp[i + 1] = Math.max(dp[i] + ary[i], ary[i])
    max = Math.max(max, dp[i + 1])
}

console.log(max)