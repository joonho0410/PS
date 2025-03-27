const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [N, M] = input.shift().split(' ').map(Number)
const [sr, sc] = input.shift().split(' ').map(Number)
const [er, ec] = input.shift().split(' ').map(Number)

const map = []
const visit = Array.from({length : 2}, () =>
    Array.from({length: N}, () => Array(M).fill(Infinity)))


const dr = [1, -1, 0, 0]
const dc = [0, 0, 1, -1]

for (let i = 0; i < N; ++i) {
    map.push(input[i].split(' ').map(Number))
}

visit[0][sr - 1][sc - 1] = 0;
const q =  [[sr - 1, sc - 1, 0]] // [r, c, break]
let idx = 0;

while (q.length > idx) {
    const [r, c, magic] = q[idx++]
    
    for (let i = 0; i < 4; ++i) {
        const nr = r + dr[i]
        const nc = c + dc[i]
        
        if (nr < 0 || nr >= N || nc < 0 || nc >= M) continue;
        if (map[nr][nc] === 1 && magic === 0 && visit[1][nr][nc] === Infinity) {
            visit[1][nr][nc] = visit[magic][r][c] + 1;
            q.push([nr, nc, 1])
            continue;
        }
        if (map[nr][nc] === 0 && visit[magic][nr][nc] === Infinity) {
            visit[magic][nr][nc] = visit[magic][r][c] + 1;
            q.push([nr, nc, magic])
            continue;
        }
    }
}

const answer = Math.min(visit[0][er - 1][ec - 1], visit[1][er - 1][ec - 1])
console.log(answer === Infinity ? -1 : answer)
