const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [R, C] = input.shift().split(' ').map(Number)
const p = Array.from({length: R}, () => Array(C).fill(0))

let id = 0;

const map = []
const dr = [0, 0, 1, -1]
const dc = [1, -1, 0, 0]
const save = new Map();

for (let i = 0; i < R; ++i) {
    map.push(input[i].split(' ').map(Number))
}

for (let r = 0; r < R; ++r) {
    for (let c = 0; c < C; ++c) {
        if (map[r][c] === 1 && p[r][c] === 0) bfs(r, c) 
    }
}

let ans = 0;

for (let r = 0; r < R; ++r) {
    for (let c = 0; c < C; ++c) {
        if (map[r][c] === 1) continue;
        const set = new Set();

        for (let i = 0; i < 4; ++i) {
            const nr = r + dr[i]
            const nc = c + dc[i]

            if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;
            if (map[nr][nc] === 0) continue;
            set.add(p[nr][nc])
        }
        let sum = 0;
        [...set].forEach((e) => sum += save.get(e))
        ans = Math.max(sum + 1, ans)
    }
}

console.log(ans)

function bfs(sr, sc) {
    const q = [[sr, sc]]
    let idx = 0;
    let cnt = 0;
    p[sr][sc] = ++id;

    while (q.length > idx) {
        ++cnt;
        const [r, c] = q[idx++]
        
        for (let i = 0; i < 4; ++i) {
            const nr = r + dr[i]
            const nc = c + dc[i]

            if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;
            if (map[nr][nc] === 0 || p[nr][nc] !== 0) continue;
            p[nr][nc] = id;
            q.push([nr, nc])
        }
    }

    save.set(id, cnt);
}
