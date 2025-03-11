const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')


const [R, C] = input.shift().split(' ').map(Number)
const dr = [-1, 0, 1, 0]
const dc = [0, 1, 0, -1]
const visit = Array.from({length: 4},  () => 
    Array.from({length : R}, () => 
    Array(C).fill(false)
    ))

const map = []

// 위 오른쪽 아래 왼쪽


for (let i = 0; i < R; ++i) {
    map.push(input[i].split(' ').map(Number))
}

let s = []

for (let r = 0; r < R; ++r){
    for (let c = 0; c < C; ++c){
        if (map[r][c] === 9) {
            for (let j = 0; j < 4; ++j)
                s.push([r, c, j])
        }
    }
}


while (s.length != 0) {
    const [r, c, dir] = s.pop()
    const mod = dir % 2;
    let ndir = dir;
    
    if (visit[dir][r][c]) continue;
    visit[dir][r][c] = true;
    
    if (map[r][c] == 1 && (dir == 1 || dir == 3) ) ndir = (dir + 2) % 4;
    else if (map[r][c] == 2 && (dir == 0 || dir == 2)) ndir = (dir + 2) % 4;
    else if (map[r][c] == 3) {
        if (mod === 0) ndir = (dir + 1) % 4;
        else ndir = (dir + 3) % 4;
    }
    else if (map[r][c] == 4) {
        if (mod == 0) ndir = (dir + 3) % 4
        else ndir = (dir + 1) % 4
    }

    const nr = r + dr[ndir]
    const nc = c + dc[ndir]
    if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;
    s.push([nr, nc, ndir])
}

let answer = 0;
for (let r = 0; r < R ; ++ r){
    for (let c = 0; c < C; ++ c){
        if (visit[0][r][c] || visit[1][r][c] || visit[2][r][c] || visit[3][r][c] ) ++answer
    }
}
console.log(answer)