const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
let cnt = 1;

while (1) {
    const N = Number(input[0])
    if (N == 0) break;

    let dp = input[1].split(' ').map(Number)
    dp = [Infinity, dp[1], dp[1] + dp[2]]
    for (let i = 2; i <= N; ++i) {
        const cur = input[i].split(' ').map(Number)
        const next = Array(3).fill(0)

        next[0] = Math.min(dp[0], dp[1]) + cur[0]
        next[1] = Math.min(dp[0], dp[1], dp[2], next[0]) + cur[1]
        next[2] = Math.min(dp[1], dp[2], next[1]) + cur[2]
        dp = next;
    }
    input.splice(0, N + 1)
    console.log(cnt + '.', dp[1])
    ++cnt;
}