const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const N = Number(input.shift())
const dp = Array.from({length : N}, () => Array(N).fill(-1n))
const map = []

for (let i = 0; i < input.length; ++i){
    map.push(input[i].split(' ').map(Number))    
}

console.log(dfs(0, 0).toString());
function dfs(r, c) {
    if (dp[r][c] != -1n) return dp[r][c];
    if (r == N - 1 && c == N - 1)
        return 1n;
    
    let ret = 0n;
    if (map[r][c] != 0) {
        const dr = [map[r][c], 0]
        const dc = [0, map[r][c]]
        
        for (let i = 0; i < 2; ++i) {
            const nr = r + dr[i]
            const nc = c + dc[i]
            if (nr < 0 || nr >= N || nc < 0 || nc >= N) continue;
                ret += dfs(nr, nc);
        }
    }
    dp[r][c] = ret;
    return ret;
}