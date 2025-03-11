const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [N, M] = input.shift().split(' ').map(Number)
const dp = Array.from({length : N }, () => Array(M).fill(Infinity))
const visit = Array.from({length : N }, () => Array(M).fill(false))
const map = []
const dr = [0, 0, 1, -1]
const dc = [1, -1, 0, 0]

let loop = false;

for (let i = 0; i < N; ++i) {
    map.push(input[i].split('').map((e) => {
        if (e === 'H') return 0;
        return Number(e)
    }))
}

dfs(0, 0)
function dfs(r, c) {
    if (loop) return -1;
    visit[r][c] = true;
    const cnt = map[r][c];
    let max = 0;

    for (let i = 0; i < 4; ++i) {
        const nr = r + dr[i] * cnt;
        const nc = c + dc[i] * cnt;
        if (nr < 0 || nr >= N || nc < 0 || nc >= M) continue;
        if (map[nr][nc] === 0) continue;
        if (visit[nr][nc]) {
            loop = true;
            return -1;
        }
        if (dp[nr][nc] !== Infinity) {
            max = Math.max(max, dp[nr][nc])
            continue;
        }
        max = Math.max(max, dfs(nr, nc))
    }

    dp[r][c] = max + 1;
    visit[r][c] = false;
    return dp[r][c];
}

loop ? console.log(-1) : console.log(dp[0][0]);