const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [N, M] = input.shift().split(' ').map(Number)
const dr = [0, -1, -1, -1, 0, 1, 1, 1]
const dc = [-1, -1, 0, 1, 1, 1, 0, -1]
const visit = Array.from({length : N}, () => Array(N).fill(false))
let clouds = [[N - 1, 0], [N - 2, 0], [N - 1, 1], [N - 2, 1]]
let map = []

for (let i = 0; i < N; ++i) {
    map.push(input[i].split(' ').map(Number))
}

for (let i = N; i < N + M; ++i) {
    const [dir, dis] = input[i].split(' ').map(Number)
    moveCloud(dir - 1, dis)
    clouds.forEach((e) => {
        const [r, c] = e;
        visit[r][c] = true;
        ++map[r][c];
    })
    clouds.forEach((e) => {
        const [r, c] = e;
        for (let i = 0; i < 4; ++i) {
            const nr = r + dr[2 * i + 1]
            const nc = c + dc[2 * i + 1]
            if (nr < 0 || nr >= N || nc < 0 || nc >= N) continue;
            if (map[nr][nc] == 0) continue;
            ++map[r][c];
        }
    })
    const newClouds = []
    
    for (let i = 0; i < N; ++i) {
        for (let j = 0; j < N; ++j) {
            if (visit[i][j]) {
                visit[i][j] = false
                continue;
            }
            if (map[i][j] >= 2) {
                map[i][j] -= 2;
                newClouds.push([i, j])
            }
        }
    }
    clouds = newClouds;
}

let sum = 0;
for (let r = 0; r < N; ++r) {
    for (let c = 0; c < N; ++c){
        sum += map[r][c];
    }
}
console.log(sum)

function moveCloud(dir, dis) {
    clouds = clouds.map((e) => {
        const [r, c] = e;
        const nr = (r + 50 * N + dis * dr[dir]) % N;
        const nc = (c + 50 * N + dis * dc[dir]) % N;
        return [nr, nc]
    })
}