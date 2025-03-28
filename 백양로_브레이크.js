const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [N, M] = input.shift().split(' ').map(Number)
const dist = Array.from({length : N + 1}, () => Array(N + 1).fill(Infinity))
for (let i = 1 ; i <= N; ++i) dist[i][i] = 0;

for (let i = 0; i < M; ++i) {
    const [u, v, b] = input[i].split(' ').map(Number)
    dist[u][v] = 0;
    if (b === 1) dist[v][u] = 0;
    else dist[v][u] = 1;
}

floyd();
input.splice(0, M);
const K = Number(input.shift())

solve();

function solve() {
    let ans = []

    for (let i = 0; i < K; ++i) {
        const [s, e] = input[i].split(' ').map(Number)
        ans.push(dist[s][e])
    }
    console.log(ans.join('\n'))
}

function floyd() {
    for (let m = 1; m <= N; ++m) {
        for (let s = 1; s <= N; ++s) {
            for (let e = 1; e <= N; ++e) {
                if (dist[s][e] <= dist[s][m] + dist[m][e]) continue;
                dist[s][e] = dist[s][m] + dist[m][e]
            }
        }
    }
}
