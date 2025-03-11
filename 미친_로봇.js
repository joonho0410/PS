const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [N, e, w, s, n] = input.shift().split(' ').map(Number)

const pro = [e, w, s, n]
const prosum = e + w + s + n; 
const dr = [0, 0, 1, -1]
const dc = [1, -1, 0, 0]

const MAX = 2 * N + 1
const map = Array.from({length : MAX}, () => 
    Array(MAX).fill(false))

const [sr, sc] = [N, N]
map[sr][sc] = true;

let ans = 0;

dfs(sr, sc, 1, 0)
function dfs(r, c, sum, cnt) {
    if (cnt === N) { ans += sum; return ; }    
    map[r][c] = true;

    for (let i = 0; i < 4; ++i) {
        if (pro[i] === 0) continue;
        const nr = r + dr[i]
        const nc = c + dc[i]
        if (nr < 0 || nc < 0 || nr >= MAX || nc >= MAX) continue;
        if (map[nr][nc]) continue;
        dfs(nr, nc, sum * (pro[i] / prosum), cnt + 1)
    }
    map[r][c] = false;
}

console.log(ans === 1 ? '1.0' : ans)
