const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const dr = [0, 0, 1, -1]
const dc = [1, -1, 0, 0]

const [N, M, K] = input.shift().split(' ').map(Number)
const map = []
for (let i = 0; i < N; ++i) {
    map.push(input[i].split(''))
}

const target = input[N].split('')
const completed = Array.from({length : target.length}, () => 
    Array.from({length : N}, () => Array(M).fill(-1)))

solve();

function solve() {
    const q = findStart();
    let idx = 0;

    let answer = 0;
    while (q.length > idx) {
        const [r, c] = q[idx++]
        answer += dfs(r, c, 1);
    }

    console.log(answer)
}

function dfs(r, c, len) {
    if (len === target.length) return 1;
    if (completed[len][r][c] !== -1) return completed[len][r][c];

    let cnt = 0;

    for (let i = 0; i < 4; ++i) {
        for (let k = 1; k <= K; ++k) {
            const nr = r + dr[i] * k;
            const nc = c + dc[i] * k;

            if (nr < 0 || nr >= N || nc < 0 || nc >= M) continue;
            if (map[nr][nc] === target[len]) cnt += dfs(nr, nc, len + 1);
        }
    }

    completed[len][r][c] = cnt;
    return cnt;
}

function findStart() {
    const q = []

    for (let r = 0; r < N; ++r) {
        for (let c = 0; c < M; ++c) {
            if (map[r][c] !== target[0]) continue;
            q.push([r, c])
        }
    }

    return q;
}
