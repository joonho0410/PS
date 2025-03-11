const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const N = Number(input.shift())
const map = []
const dr = [0, 0, 1, -1]
const dc = [1, -1, 0, 0]

const visit = Array.from({length : N }, () => Array(N).fill(Infinity)) // 여기 까지 도달하는데 부순 갯수

for (let i = 0; i < N; ++i) {
    map.push(input[i].split('').map(Number))
}

const q = [[0, 0]]
visit[0][0] = 0;
let idx = 0;

while (q.length > idx) {
    const [r, c] = q[idx++]
    
    for (let i = 0; i < 4; ++i) {
        const nr = r + dr[i]
        const nc = c + dc[i]
        if (nr < 0 || nr >= N || nc < 0 || nc >= N) continue;
        if (map[nr][nc] == 1 && visit[r][c] < visit[nr][nc]) {
            visit[nr][nc] = visit[r][c];
            q.push([nr, nc])
            continue;
        }
        if (map[nr][nc] == 0 && visit[r][c] + 1 < visit[nr][nc]) {
            visit[nr][nc] = visit[r][c] + 1;
            q.push([nr, nc])
            continue;
        } 
    }
}

console.log(visit[N - 1][N - 1])