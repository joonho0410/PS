const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const dr = [1, 1, 1, 0, 0, 0, -1, -1, -1]
const dc = [-1, 0, 1, -1, 0, 1, -1, 0, 1]

let board = []
let ret = 0;
const visit = Array.from({length : 8}, () =>
    Array.from({length: 8}, ()=> Array(20).fill(false)))
for (let i = 0; i < 8; ++i) {
    board.push(input[i].split(''))
}

bfs();
console.log(ret);

function bfs() {
    let q = [[7, 0, 0]]
    let idx = 0;
    let time = 0;

    while (q.length > idx) {
        const [r, c, t] = q[idx++]

        if (time != t) {time = t; moveWall() }
        if (board[r][c] === '#') continue;
        if (r === 0 && c === 7) { ret = 1; break; }

        for (let i = 0; i < 9; ++i) {
            let nr = r + dr[i]
            let nc = c + dc[i]
            if (nr < 0 || nr >= 8 || nc < 0 || nc >= 8) continue;
            if (board[nr][nc] === '#') continue;
            if (visit[nr][nc][t + 1]) continue;
            visit[nr][nc][t + 1] = true;
            q.push([nr, nc, t + 1])
        }
    }
}

function moveWall() {
    board = ['........'.split(''), ...board.slice(0, 7)]
}