const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [R, C, K] = input.shift().split(' ').map(Number)
const visit = Array.from({length : R}, () => Array(C).fill(0))
const map = []
const dr = [0, 0, 1, -1]
const dc = [1, -1, 0, 0]

let sum = 0;
let ans = -Infinity

for (let i = 0; i < R; ++i) {
    map.push(input[i].split(' ').map(Number))
}

recur(0, 0)
console.log(ans)

function recur(idx, cnt) {
    const r = Math.floor(idx / C)
    const c = idx % C

    if (cnt === K) {
        ans = Math.max(ans, sum)
        return ;
    }
    if (idx >= R * C) return;
    if (visit[r][c] > 0) {
        recur(idx + 1, cnt)
        return ;
    }

    sum += map[r][c];
    for (let i = 0; i < 4; ++i) {
        const nr = r + dr[i]
        const nc = c + dc[i]
        if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;
        ++visit[nr][nc];
    }
    recur(idx + 1, cnt + 1)
    
    for (let i = 0; i < 4; ++i) {
        const nr = r + dr[i]
        const nc = c + dc[i]
        if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;
        --visit[nr][nc];
    }
    sum -= map[r][c];
    recur(idx + 1, cnt)
}