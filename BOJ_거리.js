const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const N = Number(input.shift())
const str = input.shift().split('')
const dp = Array(N).fill(Infinity)
dp[0] = 0;
const q = [[0, 0, 0]]
const char = ['B', 'O', 'J']
let idx = 0;

while (q.length > idx) {
    const [c, n, c2] = q[idx++]
    if (dp[n] < c2) continue;
    const next = char[(c + 1) % 3]

    for (let i = n + 1; i < N; ++i) {
        if (str[i] !== next) continue;
        const cost = dp[n] + (i - n) * (i - n);
        if (cost >= dp[i]) continue;
        dp[i] = cost;
        q.push([(c + 1) % 3, i, cost])
    }
}

dp[N - 1] === Infinity ? console.log(-1) : console.log(dp[N - 1])