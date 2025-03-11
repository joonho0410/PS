const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [N, D] = input.shift().split(' ').map(Number)
const roads = Array.from({length : D + 1}, () => [])
const dp = Array(D + 1).fill(Infinity);

for (let i = 0; i < N; ++i) {
    const[s, e, d] = input[i].split(' ').map(Number)
    if (s > D) continue;
    roads[s].push([e, d]);
}

dp[0] = 0;

for (let i = 0; i <= D; ++i) {
    let cur;
    if (i == 0) { cur = 0; dp[0] = 0 }
    else { 
        cur = dp[i - 1] + 1 < dp[i] ? dp[i - 1] + 1 : dp[i];
        dp[i] = cur;
    }

    for (let j = 0; j < roads[i].length; ++j) {
        const [e, d] = roads[i][j]
        if (e > D) continue;
        if (dp[i] + d >= dp[e]) continue;
        dp[e] = dp[i] + d;
    }
}

console.log(dp[D])
