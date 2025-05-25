const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [V, E] = input.shift().split(' ').map(Number)
const adj = Array.from({length: V + 1}, () => [])
const visited = Array(V + 1).fill(null)

for (let i = 0; i < E; ++i) {
    const [a, b] = input[i].split(' ').map(Number)
    adj[a].push(b)
    adj[b].push(a)
}
let cnt = 0;
const ans = []

solve()
ans.sort((a, b) => {
    if (a[0] !== b[0]) return a[0] - b[0]
    return a[1] - b[1]
})
console.log(ans.length)
console.log(ans.map((e) => e.join(' ')).join('\n'))
function solve() {
    for (let i = 1; i <= V; ++i) {
        if (!visited[i]) dfs(i, 0)
    }
}

function dfs(node, from) {
    visited[node] = ++cnt;

    let low = visited[node]
    let isCycle = false;

    for (const next of adj[node]) {
        if (visited[next]) {
            low = Math.min(low, visited[next])
            if (next !== from && visited[next] < visited[node]) isCycle = true;
            continue;
        }
        const [save, nIsCycle] = dfs(next, node)
        if (!nIsCycle) ans.push(next < node ? [next, node] : [node, next])
        if (nIsCycle && save < visited[node]) isCycle = true 
        low = Math.min(low, save)
    }

    return [low, isCycle]
}
