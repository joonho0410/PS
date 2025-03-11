const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const N = Number(input.shift())
const degree = Array(N + 1).fill(-1)
const adj = Array.from({length : N + 1}, () => [0, []])
const dp = Array(N + 1).fill(0)

for (let i = 0; i < N; ++i) {
    const idx = i + 1
    const [time, cnt, ...before] = input[i].split(' ').map(Number)
    adj[idx] = [time, adj[idx][1]];
    degree[idx] = cnt;
    
    for (b of before) {
        adj[b][1].push(idx);
    }
}

const q = []
let idx = 0;

for (let i = 1; i <= N; ++i) {
    if (degree[i] == 0) q.push(i);
}

while (q.length > idx) {
    const node = q[idx++]
    
    dp[node] +=  adj[node][0];
    
    for (next of adj[node][1]) {
        --degree[next];
        dp[next] = Math.max(dp[next], dp[node])
        if (degree[next] == 0) q.push(next)
    }
}

dp.sort((a, b) => a - b)
console.log(dp.pop())