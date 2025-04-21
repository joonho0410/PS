const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const Direction = {
    U: 0,
    D: 1,
    R: 2,
    L: 3
}
const dr = [-1, 1, 0, 0]
const dc = [0, 0, 1, -1]

const [N, M] = input.shift().split(' ').map(Number)
const visit = Array.from({length : N}, () => Array(M).fill(false))
const escape = Array.from({length : N}, () => Array(M).fill(false))

const map = []
let ans = 0

for (let i = 0; i < N; ++i) {
    map.push(input[i].split(''))
}

for (let r = 0; r < N; ++r) {
    for (let c = 0; c < M; ++c) {
        if (visit[r][c]) continue;
        findRoad(r, c)
    }
}

for (let r = 0; r < N; ++r) {
    for (let c = 0; c < M; ++c) {
        if (escape[r][c]) ++ans
    }
}

console.log(ans)

function findRoad(r, c) {
    const dir = map[r][c];
    visit[r][c] = true;

    const nr = r + dr[Direction[dir]]
    const nc = c + dc[Direction[dir]]
    if (nr < 0 || nr >= N || nc < 0 || nc >= M) {
        escape[r][c] = true;
        return true;
    }

    if (visit[nr][nc]) {
        escape[r][c] = escape[nr][nc];
        return escape[nr][nc];
    }
    escape[r][c] = findRoad(nr, nc);
    return escape[r][c]
}
