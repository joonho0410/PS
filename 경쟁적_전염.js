const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [N, K] = input.shift().split(' ').map(Number)
const map = []
const dr = [0, 0, 1, -1]
const dc = [1, -1, 0, 0]

for (let i = 0; i < N; ++i) {
    map.push(input[i].split(' ').map(Number))
}

input.splice(0, N)

const [S, X, Y] = input.shift().split(' ').map(Number)
const q = []

for (let i = 0; i < N; ++i) {
    for (let j = 0; j < N; ++j) {
        if (map[i][j] != 0) q.push([i, j, 0])
    }
}
q.sort((a, b) => {
    const [ar, ac, at] = a;
    const [br, bc, bt] = b;
    return map[ar][ac] - map[br][bc]
})

let idx = 0;

while (q.length > idx) {
    const [r, c, t] = q[idx++]
    if (t === S) continue;

    for (let i = 0; i < 4; ++i) {
        const nr = r + dr[i]
        const nc = c + dc[i]
        if (nr < 0 || nr >= N || nc < 0 || nc >= N) continue;
        if (map[nr][nc] != 0) continue;
        map[nr][nc] = map[r][c];
        q.push([nr, nc, t + 1])
    }    
}

console.log(map[X - 1][Y - 1])