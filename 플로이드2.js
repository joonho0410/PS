const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const N = Number(input.shift())
const M = Number(input.shift())

const adj = Array.from({length : N}, () => Array(N).fill(Infinity))
const path = Array.from({length : N}, () => 
    Array.from({length : N}, () => 0))
for (let i = 0; i < N; ++i) adj[i][i] = 0;
for (let i = 0; i < M; ++i) {
    const [s, e, c] = input[i].split(' ').map(Number)
    if (adj[s - 1][e - 1] <= c) continue;
    adj[s - 1][e - 1] = c;
    path[s - 1][e - 1] = [s - 1, e - 1]
}

for (let m = 0; m < N; ++m) {
    for (let s = 0; s < N; ++s) {
        for (let e = 0; e < N; ++e) {
            if (adj[s][m] + adj[m][e] >= adj[s][e]) continue;
            adj[s][e] = adj[s][m] + adj[m][e];
            path[s][e] = [...path[s][m], ...path[m][e].slice(1)]
        }
    }
}

for (let s = 0; s < N; ++s)
    for (let e = 0; e < N; ++e)
        if (adj[s][e] === Infinity) adj[s][e] = 0;

console.log(adj.map((e) => e.join(' ')).join('\n'))
let ans = []
for (let s = 0; s < N; ++s) {
    for (let e = 0; e < N; ++e) {
        if (adj[s][e] === 0) ans.push(0)
        else ans.push(`${path[s][e].length} ${path[s][e].map((e) => e + 1).join(' ')}`)
    }
}
console.log(ans.join('\n'))
