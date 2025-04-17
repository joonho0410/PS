const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [R, C] = input.shift().split(' ').map(Number)
const map = []

const dr = [1, 1, 1, 0, 0, 0, -1, -1, -1]
const dc = [-1, 0, 1, -1, 0, 1, -1, 0, 1]

for (let i = 0; i < R; ++i) {
    map.push(input[i].split(''))
}

const orders = input[R].split('').map(Number)

let cnt = 0;
let [sr, sc] = [0, 0]
let crazys = []

// find sr, sc
for (let r = 0; r < R; ++r) {
    for (let c = 0; c < C; ++c) {
        if (map[r][c] === 'I') { [sr, sc] = [r, c] }
        if (map[r][c] === 'R') { crazys.push(r * C + c)}
    }
}

for (; cnt < orders.length; ++cnt){
    const dir = orders[cnt] - 1;
    const [nr, nc] = [sr + dr[dir], sc + dc[dir]]
    if (map[nr][nc] === 'R') break;
    map[sr][sc] = '.'
    map[nr][nc] = 'I'
    sr = nr; sc = nc;
    
    let nextCrazy = new Map();
    for (crazy of crazys) {
        checkCrazyMove(Math.floor(crazy / C), crazy % C, nextCrazy)
    }
    crazys = clearAndWrite(crazys, nextCrazy)
    if (crazys === null) break;
}

if (cnt < orders.length) console.log(`kraj ${cnt + 1}`)
else {
    for (let i = 0; i < R; ++i)
        console.log(map[i].join(''))
}

function checkCrazyMove(r, c, nextCrazy) {
    let [nextr, nextc] = [0, 0];
    let max = Infinity

    for (let i = 0; i < 9; ++i) {
        const nr = r + dr[i]
        const nc = c + dc[i]
        if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;
        
        const cur = Math.abs(nr - sr) + Math.abs(nc - sc)
        if (cur < max) {
            nextr = nr; nextc = nc;
            max = cur;
        }
    }

    const idx = nextr * C + nextc
    if (!nextCrazy.has(idx)) nextCrazy.set(idx, 0)
    nextCrazy.set(idx, nextCrazy.get(idx) + 1)
}

function clearAndWrite(before, after) {
    let nextCrazy = []
    for (e of before) {
        const r = Math.floor(e / C)
        const c = e % C
        map[r][c] = '.'
    }
    for (e of after) {
        const [key, val] = e
        const r = Math.floor(key / C)
        const c = key % C
        if (map[r][c] === 'I') return null;
        if (val >= 2) continue;
        map[r][c] = 'R'
        nextCrazy.push(key)
    }

    return nextCrazy
}
