const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const dr = [1, -1, 0, 0]
const dc = [0, 0, 1, -1]

const [N, M] = input.shift().split(' ').map(Number)
const map = []
let ans = false;
const visit = Array.from({length : N}, () => 
    Array(M).fill(0))
const finished = Array.from({length : N}, () => 
    Array(M).fill(0))
for (let i = 0; i < N; ++i) {
    map.push(input[i].split(''))
}

for (let r = 0; r < N; ++r) {
    for (let c = 0; c < M; ++c) {
        visit[r][c] = 1;
        dfs(r, c)
    } 
}

console.log(ans ? 'Yes' : 'No')

function dfs(r, c) {
    for (let i = 0; i < 4; ++i) {
        const nr = r + dr[i]
        const nc = c + dc[i]
        if (nr < 0 || nc < 0 || nr >= N || nc >= M) continue;
        if (map[nr][nc] !== map[r][c]) continue;
        if (visit[nr][nc] !== 0 && (visit[r][c] - visit[nr][nc] >= 3)) {
            ans = true;
            break;
        }
        if (visit[nr][nc] !== 0) continue;
        visit[nr][nc] = visit[r][c] + 1;
        dfs(nr, nc)
        if (ans) return ;
    }
}