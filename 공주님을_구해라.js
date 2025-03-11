const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [R, C, T] = input.shift().split(' ').map(Number)
const visit = Array.from({length : R}, () => Array(C).fill(Infinity))
const map = []
let sword;

const dr = [1, -1, 0, 0]
const dc = [0, 0, 1, -1]
for (let i = 0; i < R; ++i) {
    map.push(input[i].split(' ').map(Number))
}
visit[0][0] = 0;

for (let r = 0; r < R; ++r) {
    for (let c = 0; c < C; ++c) {
        if (map[r][c] == 2) sword = [r, c]; 
    }
}

solve()

function bfs(sr, sc) {
    visit[sr][sc] = 0;
    const q = [[sr, sc, map[sr][sc] === 2]]
    let idx = 0;

    while (q.length > idx) {
        const [r, c, hasSword] = q[idx++]


        for (let i = 0; i < 4; ++i) {
            const nr = r + dr[i]
            const nc = c + dc[i]
            if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;
            if (visit[nr][nc] !== Infinity) continue;
            if (map[nr][nc] == 1 && !hasSword) continue;
            visit[nr][nc] = visit[r][c] + 1;
            q.push([nr, nc, hasSword || map[nr][nc] === 2])
        }   
    }
}

function initVisit() {
    for (let i = 0; i < R; ++i) 
        for (let j = 0; j < C; ++j)
            visit[i][j] = Infinity;
}

function solve() {
    let ans = Infinity
    let toSword = 0;
    bfs(0, 0)
    toSword = visit[sword[0]][sword[1]];
    ans = visit[R - 1][C - 1]
    initVisit();
    bfs(sword[0], sword[1])

    ans = Math.min(ans, toSword + visit[R - 1][C - 1])
    console.log(ans <= T ? ans : 'Fail')
}