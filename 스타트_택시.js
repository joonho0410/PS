const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const map = []
const dr = [0, 0, 1, -1]
const dc = [1, -1, 0, 0]

// initialize
const [N, M, fuel] = input.shift().split(' ').map(Number)
const dist = Array.from({length : N * N }, () => Array(N * N).fill(Infinity))
for (let i = 0; i < N; ++i) {
    map.push(input[i].split(' ').map(Number))
}
input.splice(0, N);
const [tr, tc] = input.shift().split(' ').map(Number)
const clients = []

for (let i = 0; i < M; ++i) {
    const [sr, sc, er, ec] = input[i].split(' ').map(Number)
    const client = (sr - 1) * N + (sc - 1);
    const dest = (er - 1) * N + (ec - 1);
    clients.push([client, dest])
}

// setting for floyd
for (let r = 0; r < N; ++r) {
    for (let c = 0; c < N; ++c) {
        if (map[r][c] === 1) continue;
        const cur = N * r + c

        for (let i = 0; i < 4; ++i) {
            const nr = r + dr[i]
            const nc = c + dc[i]
            if (nr < 0 || nr >= N || nc < 0 || nc >= N) continue;
            if (map[nr][nc] === 1) continue;
            const next = N * nr + nc
            dist[cur][next] = 1;     
        }
    }
}
for (let i = 0; i < N * N; ++i){
    dist[i][i] = 0;
}

floyd();
console.log(findAns());

// findAns
function findAns() {
    let taxi = (tr - 1) * N + (tc - 1);
    let curf = fuel;

    while (clients.length > 0) {
        clients.sort((a, b) => {
            const [c1, d1] = a;
            const [c2, d2] = b;

            if (dist[taxi][c1] === dist[taxi][c2]) return c2 - c1;
            return dist[taxi][c2] - dist[taxi][c1];
        })
        const [client, dest] = clients.pop();
        if (dist[taxi][client] === Infinity || curf - dist[taxi][client] < 0) exit();
        curf -= dist[taxi][client]
        if (dist[client][dest] === Infinity || curf - dist[client][dest] < 0) exit();
        curf += dist[client][dest]

        taxi = dest;
    }

    return curf;
}

function exit() {
    console.log('-1')
    process.exit();
}

function floyd() {
    const d = N * N;
    for (let m = 0; m < d; ++m){
        for (let s = 0; s < d; ++s){
            for (let e = 0; e < d; ++e) {
                if (dist[s][m] === Infinity || dist[m][e] === Infinity) continue;
                if (dist[s][e] <= dist[s][m] + dist[m][e]) continue;
                dist[s][e] = dist[s][m] + dist[m][e];
            }
        }
    }
}