const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [N, M] = input.shift().split(' ').map(Number)
const adj = Array.from({length : N + 1}, () => [])
const dist = Array.from({length : N + 1}, () => 
    Array(N + 1).fill(Infinity)
)

for (let i = 0; i < M; ++i) {
    const [s, e, len] = input[i].split(' ').map(Number)
    adj[s].push([e, len])
    adj[e].push([s, len])
    dist[s][e] = Math.min(dist[s][e], len)
    dist[e][s] = Math.min(dist[e][s], len)
}

for (let i = 1; i <= N; ++i) dist[i][i] = 0;
solve();

function solve() {
    let ans = Infinity;
    floyd();

    for (let i = 1; i <= N; ++i) ans = Math.min(ans, findShortest(i))
    console.log(ans.toFixed(1))
}

function findShortest(s){
    let max = -Infinity

    for (let e = 1; e <= N; ++e) {
        const ta = dist[s][e];

        for (const [next, len] of adj[e]) {
            const tb = dist[s][next]
            const [mint, maxt] = ta < tb ? [ta, tb] : [tb, ta] 
            if (mint + len <= maxt) max = Math.max(max, maxt);
            else {
                const addTime = (len - (maxt - mint)) / 2
                max = Math.max(max, maxt + addTime)
            }
        }
    }

    return max;
}

function floyd() {
    for (let m = 1; m <= N; ++m) {
        for (let s = 1; s <= N; ++s) {
            for (let e = 1; e <= N; ++e) {
                if (dist[s][m] + dist[m][e] < dist[s][e]){
                    dist[s][e] = dist[s][m] + dist[m][e];
                }
            }
        }
    }
}

