const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [R, C] = input.shift().split(' ').map(Number)
const map = input.map((e) => e.split(' ').map(Number))
const visit = Array.from({length: R }, () => Array(C).fill(false))

const dr = [-1, -1, -1, 0, 0, 1, 1, 1]
const dc = [-1, 0, 1, -1, 1, -1, 0, 1]

let ans = 0;

for (let i = 0; i < R; ++i) {
    for (let j = 0; j < C; ++j){
        if (map[i][j] == 1 && !visit[i][j]) {
            dfs(i, j)
            ++ans
        } 
    }
}

console.log(ans)
function dfs(r, c) {
    const q = [[r, c]]
    visit[r][c] = true;
    let idx = 0;

    while (q.length > idx) {
        const [r, c] = q[idx++]
        
        for (let i = 0; i < 8; ++i) {
            const nr = r + dr[i]
            const nc = c + dc[i]
            if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;
            if (visit[nr][nc] || map[nr][nc] == 0) continue;
            visit[nr][nc] = true;
            q.push([nr,nc])
        }
    }
}