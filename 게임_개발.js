const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const N = Number(input.shift())
const adj = Array.from({length: N + 1}, () => [])
const degree = Array(N + 1).fill(0)
const cost = Array(N + 1).fill(0)
const dp = Array(N + 1).fill(0)

// setting
for (let i = 0; i < N; ++i) {
    const ary = input[i].split(' ').map(Number);
    cost[i + 1] = ary[0];
    for (let j = 1; j < ary.length - 1; ++j){
        const pre = ary[j]
        adj[pre].push(i + 1)
    }
    degree[i + 1] = ary.length - 2;
}

solve()

function solve() {
    let q = []
    
    for (let i = 1; i <= N; ++i)
        if (degree[i] == 0) {
            dp[i] = cost[i];
            q.push(i);
        }
    
    let idx = 0;
    while (q.length > idx) {
        const cur = q[idx++]

        for (let i = 0; i < adj[cur].length; ++i) {
            const next = adj[cur][i]
            degree[next]--;
            if (dp[next] < dp[cur]) dp[next] = dp[cur]; 
            if (degree[next] == 0) {
                dp[next] += cost[next];
                q.push(next);
            }
        }
    }
    console.log(dp.splice(1).join('\n'))
}