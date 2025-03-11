const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [N, K] = input.shift().split(' ').map(Number)
const items = input.map((e) => e.split(' ').map(Number))
const dp = Array(100001).fill(0)

for (item of items) {
    const [w ,v] = item;
    for (let i = 100001; i >= 0; --i){
        if (i + w <= 100000 && dp[i + w] < dp[i] + v)
        dp[i + w] = dp[i] + v;
    }
}

let ans = 0;
for (let i = 0; i <= K; ++i) {
    ans = Math.max(ans, dp[i])
}
console.log(ans)