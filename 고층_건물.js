const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const N = Number(input.shift())
const buildings = input.shift().split(' ').map(Number)
const dp = Array(N).fill(0)

for (let i = 0; i < buildings.length; ++i) {
    const cur = buildings[i]
    let leanMax = -Infinity

    for (let j = i + 1; j < buildings.length; ++j) {
        const next = buildings[j]
        const lean = (next - cur) / (j - i)
        if (lean <= leanMax) continue;
        leanMax = lean;
        dp[i]++;
        dp[j]++;    
    }
}

let ans = 0;

for (let i = 0; i < N; ++i) {
    ans = Math.max(ans, dp[i])
}

console.log(ans)