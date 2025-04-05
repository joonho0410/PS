const dr = [0, 0, 1, -1]
const dc = [1, -1, 0, 0]

const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [R, C] = input.shift().split(' ').map(Number)
const visit = Array.from({length : R}, () => Array(C).fill(false))
const map = []

const spaces = []
const posi = []
for (let i = 0 ; i < R; ++i) {
    map.push(input[i].split(' ').map(Number));
}
for (let r = 0; r < R; ++r) {
    for (let c = 0; c < C; ++c) {
        if (map[r][c] === 0) spaces.push(r * C + c)        
    }
}
for (let r = 0; r < R; ++r){
    for (let c = 0; c < C; ++c) {
        if (map[r][c] === 2 && !visit[r][c]) {
            const ary = new Set()
            const ret = dfs(r, c, ary)
            if (ary.size <= 2) posi.push([...ary, ret])
        }
    }
}
let ans = 0;

for (let i = 0; i < spaces.length; ++i) {
    for (let j = i + 1; j < spaces.length; ++j) {
        const s1 = spaces[i]
        const s2 = spaces[j]
        let ret = 0;

        for (p of posi) {

            const ary = p.slice(0, p.length - 1)
            
            if (ary.length === 2 && (ary.includes(s1) && ary.includes(s2))) ret += p[2]
            if (ary.length === 1 && (ary.includes(s1) || ary.includes(s2))) ret += p[1]
        }
       
        ans = Math.max(ans, ret)
    }
}

console.log(ans)

function dfs(r, c, ary) {
    let ret = 1;
    visit[r][c] = true;
    
    for (let i = 0; i < 4; ++i) {
        const nr = r + dr[i]
        const nc = c + dc[i]

        if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;
        if (visit[nr][nc]) continue;
        if (map[nr][nc] === 0) ary.add((nr * C + nc))
        if (map[nr][nc] === 2) ret += dfs(nr, nc, ary); 
    }
    return ret;
}
