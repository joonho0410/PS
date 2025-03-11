const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const N = Number(input.shift())
const map = []
const dr = [0, 1]
const dc = [1, 0]

for (let i = 0; i < N; ++i) {
    map.push(input[i].split(' ').map(Number))
}

const visit = Array.from({length : N}, () => Array(N).fill(false))

const s = [[0, 0]]
let idx = 0;

while (s.length > idx) {
    const [r, c] = s[idx++]

    for (let i = 0; i < 2; ++i) {
        const nr = r + dr[i] * map[r][c]
        const nc = c + dc[i] * map[r][c]
        if (nr < 0 || nr >= N || nc < 0 || nc >= N) continue;
        if (visit[nr][nc]) continue;
        visit[nr][nc] = true;
        s.push([nr, nc])
    }
}

visit[N - 1][N - 1] ? console.log('HaruHaru') : console.log('Hing')