const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [N, M] = input.shift().split(' ').map(Number)
const arys = input.shift().split(' ').map(Number)
const works = new Set(arys)
const dp = Array(N + 1).fill(Infinity)
dp[0] = 0

let sum = [];
dfs(0, 0);

for (work of works) {
    for (let i = 0; i <= N; ++i) {
        if (i - work < 0) continue;
        dp[i] = Math.min(dp[i], dp[i - work] + 1) 
    }
}
console.log(dp[N] === Infinity ? -1 : dp[N])


function dfs(idx) {
    if (sum.length === 2) {
        works.add(sum[0] + sum[1]);
        return ;
    }
    for (let i = idx; i < M; ++i) {
        sum.push(arys[i])
        dfs(i + 1)
        sum.pop()
    }
}