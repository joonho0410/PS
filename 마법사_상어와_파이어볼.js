const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [N, M, K] = input.shift().split(' ').map(Number)
const dr = [-1, -1, 0, 1, 1, 1, 0, -1]
const dc = [0, 1, 1, 1, 0, -1, -1, -1]

let map = Array.from({length : N}, () => 
    Array.from({length: N}, () => []))

for (let i = 0; i < M; ++i) {
    const [r, c, m, s, d] = input[i].split(' ').map(Number)
    map[r - 1][c - 1].push([m, s, d])
}

let cnt = 0;
while (1) {
    if (cnt === K) break;

    const cpyMap = Array.from({length : N}, () => 
        Array.from({length : N}, () => [])
    )
    for (let i = 0; i < N; ++i) {
        for (let j = 0; j < N; ++j) {
            if (map[i][j].length === 0) continue;
            moveFires(i, j, cpyMap)
        }
    }

    for (let i = 0; i < N; ++i){
        for (let j = 0; j < N; ++j) {
            if (cpyMap[i][j].length <= 1) continue;
            makeFire(i, j, cpyMap)
        }
    }
    map = cpyMap
    ++cnt;
}

// findAns
let ans = 0;
for (let i = 0; i < N; ++i) {
    for (let j = 0; j < N; ++j) {
        if (map[i][j].length === 0) continue;
        const fires = map[i][j];
        for (fire of fires) {
            const [m, s, d] = fire;
            ans += m;
        }
    }
}
console.log(ans)

function moveFires(r, c, cpyMap) {
    const fires = map[r][c]
    
    for (fire of fires) {
        const [m, s, d] = fire;

        let nr = (r + s * dr[d] + s * N) % N
        let nc = (c + s * dc[d] + s * N) % N
        cpyMap[nr][nc].push([m, s, d])
    }
}

function makeFire(r, c, cpyMap) {
    const fires = cpyMap[r][c];
    const dir = fires[0][2] % 2;
    let [totalM, totalS, newD] = [0, 0, 0]
    for (fire of fires) {
        const [m, s, d] = fire;
        totalM += m
        totalS += s;
        if (d % 2 != dir) newD = 1;
    }
    const newM = Math.floor(totalM / 5)
    const newS = Math.floor(totalS / fires.length)
    if (newM === 0) {
        cpyMap[r][c] = []
        return ;
    }
    const newFires = []
    for (let i = 0; i < 8; i += 2){
        newFires.push([newM, newS, i + newD])
    }
    cpyMap[r][c] = newFires
}