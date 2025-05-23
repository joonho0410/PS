const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

// 탐색시간, 순서
const [V, E] = input.shift().split(' ').map(Number)
const adj = Array.from({length : V + 1}, () => [])
const visited = Array(V + 1).fill(null);
const ans = Array(V + 1).fill(false);
let cnt = 0;

for (let i = 0; i < E; ++i) {
    const [a, b] = input[i].split(' ').map(Number)
    adj[a].push(b)
    adj[b].push(a)
}

solve();

function solve() {
    for (let i = 1; i <= V; ++i) {
        if (visited[i] !== null) continue;
        dfs(i, true)
    }
    const temp = []
    for (let i = 1; i <= V; ++i) {
        if (ans[i]) temp.push(i)
    }
    console.log(temp.length);
    console.log(temp.join(' '))
}

function dfs(v, root) {
    visited[v] = ++cnt;
    let save = visited[v];

    let child = 0;
    for (next of adj[v]) {
        if (visited[next] === null) {
            ++child;
            let low = dfs(next, false)
            save = Math.min(save, low)
            if (!root && low >= visited[v]) ans[v] = true;
        } else {
            save = Math.min(save, visited[next])
        }
    }
    if (root && child> 1) ans[v] = true;
    return save;
}
