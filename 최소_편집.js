const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const A = input.shift().split('')
const B = input.shift().split('')

const [before, after] = A.length <= B.length ? [A, B] : [B, A]


const dp = Array.from({length : before.length + 1 }, () => Array(after.length + 1).fill(0))

for (let i = 1; i <= after.length; ++i) dp[0][i] = i;
for (let i = 1; i <= before.length; ++i) dp[i][0] = i;

for (let i = 0; i < before.length; ++i) {
    for (let j = 0; j < after.length; ++j) {
        if (before[i] !== after[j]) dp[i + 1][j + 1] = Math.min(dp[i][j], dp[i + 1][j], dp[i][j + 1]) + 1 
        else dp[i + 1][j + 1] = dp[i][j]
    }
}

console.log(dp[before.length][after.length])
