const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
let T = Number(input.shift())
const dp = [0 , 1]

while (1) {
    let len = dp.length;
    if (dp[len - 1] + dp[len - 2] > 1e9) break;
    dp.push(dp[len - 1] + dp[len - 2])    
}

for (let i = 0; i < T; ++i) {
    let N = Number(input[i])
    let ans = []
    let idx = dp.length - 1;
    while (N) {
        if (dp[idx] <= N) {
            N -= dp[idx];
            ans.push(dp[idx])
        }
        --idx;
    }
    console.log(ans.reverse().join(' '))
}