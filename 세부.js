const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [N, M] = input.shift().split(' ').map(Number)
const [s, e] = input.shift().split(' ').map(Number)
const p = Array(N + 1).fill(0)
const dp = Array(N + 1).fill(0);

for (let i = 1; i <= N; ++i) p[i] = i;

const bridges = []
const adj = Array.from({length: N + 1}, () => [])
for (let i = 0; i < M; ++i) {
    const [h1, h2, k] = input[i].split(' ').map(Number)
    bridges.push([h1, h2, k])
}

bridges.sort((a, b) => b[2] - a[2])

for (bridge of bridges) {
    const [a, b, k] = bridge;
    if (merge(a, b, k)) {
        adj[a].push([b, k])
        adj[b].push([a, k])
    }
}

if (findP(s) !== findP(e)) {
    console.log(0);
    return ;
}

let ans = 0
const visit = Array(N + 1).fill(false)
dfs(s, Infinity)

console.log(ans)

function dfs(node, v) {
    visit[node] = true;
    if (node === e) {
        ans = Math.max(v, ans)
        return ;
    }
    for (road of adj[node]) {
        const [next, value] = road;
        if (!visit[next]) dfs(next, Math.min(value, v))
    }
}

function findP(a) {
    if (p[a] === a) return a;
    return p[a] = findP(p[a]);
}

function merge(a, b,) {
    a = findP(a)
    b = findP(b)
    if (a === b) return false
    p[a] = b;
    return true;
}
