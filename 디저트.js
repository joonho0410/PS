const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [N, M] = input.shift().split(' ').map(Number)
let before = Array(M).fill(0)
let dp = Array(M).fill(0)
const desserts = []
for (let i = 0; i < M; ++i) {
    desserts.push(input[i].split(' ').map(Number))
}
for (let i = 0; i < M; ++i) before[i] = desserts[i][0]

for (let i = 1; i < N; ++i) {
    for (let j = 0; j < M; ++j) {
        let max = 0;
        for (let k = 0; k < M; ++k) {
            if (j === k) max = Math.max(max, before[k] + Math.floor(desserts[j][i] / 2))
            else max = Math.max(max, before[k] + desserts[j][i])
        }
        dp[j] = max;
    }
    before = dp;
    dp = Array(M).fill(0)
}

console.log(Math.max(...before))