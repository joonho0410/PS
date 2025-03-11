const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const N = Number(input.shift())
const adj = Array.from({length : N + 1}, () => [])
const isCycle = Array(N + 1).fill(false)
const ans = []

for (let i = 0; i < N; ++i) {
    const [s, e] = input[i].split(' ').map(Number)
    adj[s].push(e)
    adj[e].push(s)
}

for (let i = 1; i <= N; ++i) dfs(i)
for (let i = 1; i <= N; ++i) ans.push(bfs(i))

function dfs(s) {
    const visit = Array(N + 1).fill(false);
    const stack = [[s, 0]]

    while (stack.length > 0) {
        const [cur, len] = stack.pop();
        visit[cur] = true;

        for (next of adj[cur]) {
            if (next === s && len > 1) isCycle[s] = true;
            if (visit[next]) continue;
            stack.push([next, len + 1])
        }
    }
}

function bfs(s) {
    const visit = Array(N + 1).fill(false);
    const q = [[s, 0]]
    let idx = 0;

    while (q.length > idx) {
        const [cur, dis] = q[idx++]
        if (isCycle[cur]) return dis;

        for (next of adj[cur]) {
            if (visit[next]) continue;
            visit[next] = true;
            q.push([next, dis + 1])
        }
    }
}

console.log(ans.join(' '))