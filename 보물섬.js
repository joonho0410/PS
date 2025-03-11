const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [R, C] = input.shift().split(' ').map(Number)
const visit = Array.from({length: R}, () => Array(C).fill(false))
const map = []
const dr = [0, 0, 1, -1]
const dc = [1, -1, 0, 0]
let max = 0;

for (let i = 0; i < R; ++i) {
    map.push(input[i].split(''))
}

solve()
function init() {
    for (let i = 0; i < R; ++i){
        for (let j = 0; j < C; ++j){
            visit[i][j] = false;
        }
    }
}
function solve() {
    for (let i = 0; i < R; ++i){
        for (let j = 0; j < C; ++j){
            if (map[i][j] == 'L'){
                init()
                bfs(i, j);
            }
        }
    }
    console.log(max)
}

function bfs(r, c) {
    visit[r][c] = true;
    const q = [[r, c, 0]]
    let idx = 0;
    
    while (q.length > idx) {
        const [r, c, len] = q[idx++]
        for (let i = 0; i < 4; ++i) {
            const nr = r + dr[i]
            const nc = c + dc[i]
            if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;
            if (visit[nr][nc] || map[nr][nc] === 'W') continue;
            visit[nr][nc] = true;
            q.push([nr, nc, len + 1])
        }
    }
    const last = q[q.length - 1][2]
    max = Math.max(max, last)
}