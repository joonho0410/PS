const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const a = input[0].split('')
const b = input[1].split('')

const dp = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
)

for (let i = 1; i <= a.length; ++i) {
    for (let j = 1; j <= b.length; ++j) {
        if (a[i - 1] == b[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1
        else dp[i][j] = 0;
    }
}

let ans = 0
for (let i = 1; i <= a.length; ++i) {
    for (let j = 1; j <= b.length; ++j){
        ans = Math.max(ans, dp[i][j])
    }
}

console.log(ans)