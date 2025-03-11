const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const map = []
const dr = [0, 0, 1, -1]
const dc = [1, -1, 0, 0]
const [N, M] = input.shift().split(' ').map(Number)

for (let i = 0; i < N; ++i) {
    map.push(input[i].split(' ').map(Number))
}

const posi = []
const seq = []
let ans = Infinity

for (let r = 0; r < N; ++r) {
    for (let c = 0; c < N; ++c) {
        if (map[r][c] === 2) posi.push([r, c])
    }
}

dfs(0)
console.log(ans === Infinity ? '-1' : ans)

function dfs(idx) {
    if (seq.length === M ) {
        ans = Math.min(bfs(seq), ans)
        return ;
    }
    if (idx === posi.length) return ;
    seq.push(posi[idx])
    dfs(idx + 1)
    seq.pop();
    dfs(idx + 1);
}

function bfs(seq) {
    const visit = Array.from({length : N}, () => Array(N).fill(-1))
    const q =[]
    let idx = 0;
    let ret = -1;

    for (ele of seq) {
        const [r, c] = ele
        visit[r][c] = 0;
        q.push([r, c])
    }

    while (q.length > idx) {
        const [cr, cc] = q[idx++]

        for (let i = 0; i < 4; ++i) {
            const nr = cr + dr[i]
            const nc = cc + dc[i]
            if (nr < 0 || nc < 0 || nr >= N || nc >= N) continue;
            if (map[nr][nc] === 1 || visit[nr][nc] !== -1) continue;
            q.push([nr, nc])
            visit[nr][nc] = visit[cr][cc] + 1;
            ret = Math.max(ret, visit[nr][nc]) 
        }
    }
    
    for (let r = 0; r < N; ++r) {
        for (let c = 0; c < N; ++c) {
            if (map[r][c] === 0 && visit[r][c] === -1) ret = Infinity 
        }
    }

    return ret;
}