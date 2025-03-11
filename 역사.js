const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [N, K] = input.shift().split(' ').map(Number)
const dp = Array.from({length: N + 1}, () => Array(N + 1).fill(false))
for (let i = 0; i < K; ++i) {
    const [s, e] = input[i].split(' ').map(Number)
    dp[s][e] = true;
}
input.splice(0, K);

const S = Number(input.shift())
const ans = []

for (let m = 1; m <= N; ++m) {
    for (let s = 1; s <= N; ++s) {
        for (let e = 1; e <= N; ++e) {
            if (dp[s][m] && dp[m][e]) dp[s][e] = true;
        }
    }
}

for (let i = 0; i < S; ++i) {
    const [a, b] = input[i].split(' ').map(Number)
    if (dp[a][b]) ans.push(-1);
    else if (dp[b][a]) ans.push(1);
    else ans.push(0)
}

console.log(ans.join('\n'))