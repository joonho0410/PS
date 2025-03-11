const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [R, C] = input.shift().split(' ').map(Number)
const map = []
const visit = Array.from({length: R}, () => Array(C).fill(false))
const dr = [0, 0, 1, -1]
const dc = [1, -1, 0, 0]
let ans = 0;
let max = 0;
for (let i = 0; i < input.length; ++i){
    map.push(input[i].split(' ').map(Number))
}

for (let i = 0; i < R; ++i){
    for (let j = 0; j < C; ++j){
        if (map[i][j] == 1 && !visit[i][j]){
            max = Math.max(max, dfs(i, j))
            ++ans;
        }
    }
}

console.log(ans)
console.log(max)

function dfs(r, c) {
    visit[r][c] = true;
    let ret = 1;

    for (let i = 0; i < 4; ++i) {
        const nr = r + dr[i]
        const nc = c + dc[i]
        if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;
        if (visit[nr][nc] || map[nr][nc] == 0) continue;
        ret += dfs(nr, nc);
    }
    return ret; 
}