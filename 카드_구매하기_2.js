const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

// Pi = (i, cost);

const N = Number(input.shift())
const ary = input.shift().split(' ').map(Number);
const dp = Array(N + 1).fill(Infinity)

for (let i = 0; i < N; ++i) {
    const [idx, cost] = [i + 1, ary[i]];

    if (dp[idx] > cost)
        dp[idx] = cost;
    
    for (let j = 0; j <= N; ++j) {
        if (j - idx < 0) continue;
        if (dp[j] > dp[j - idx] + cost)
        dp[j] = dp[j - idx] + cost;
    }
}

console.log(dp[N])