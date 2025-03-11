const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const N = Number(input.shift())
const map = []
for (let i = 0; i < N; ++i) {
    map.push(input[i].split(' ').map(Number))
}
const dp = Array.from({length : 3} , () => 
    Array.from({length: N}, () => 
    Array(N).fill(-Infinity)))

for (let i = 0; i < N; ++i){
    for (let j = 0; j < N; ++j)
        dp[0][i][j] = 0;
}

const visit = Array.from({length : N}, () => Array(N).fill(false))
const ary = [[0, 0]] 
const dr = [0, 1]
const dc = [1, 0]

let idx = 0;

while (ary.length > idx) { 
    const [r, c] = ary[idx++]
    const toEat = map[r][c]
    const next = (toEat + 1) % 3
    dp[next][r][c] = Math.max(dp[next][r][c], dp[toEat][r][c] + 1)
    
    for (let i = 0; i < 2; ++i) {
        const nr = r + dr[i]
        const nc = c + dc[i]
        if (nr >= N || nc >= N) continue;
        for (let j = 0; j < 3; ++j) {
            dp[j][nr][nc] = Math.max(dp[j][nr][nc], dp[j][r][c])
        }
        if (visit[nr][nc]) continue;
        visit[nr][nc] = true;
        ary.push([nr, nc]);
    }
}

console.log(Math.max(dp[0][N - 1][N - 1], dp[1][N - 1][N - 1], dp[2][N - 1][N - 1]))