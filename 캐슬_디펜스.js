const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [R, C, D] = input.shift().split(' ').map(Number)
const map = []
const archer = []
for (let i = 0; i < R; ++i){
    map.push(input[i].split(' ').map(Number))
}

const enemy = []

for (let i = 0; i < R; ++i)
    for (let j = 0; j < C; ++j)
        if (map[i][j] == 1) enemy.push([i, j]);

solve()

function solve() {
    let ans = 0;
    dfs(0)
    console.log(ans)
    function dfs(idx) {
        if (archer.length == 3){
            ans = Math.max(ans, findAns())
            return ;
        }
        if (idx >= C) return ;
    
        archer.push(idx);
        dfs(idx + 1)
        archer.pop();
        dfs(idx + 1);
    }
}

function findAns() {
    let cpyMap = map.map((e) => {return [...e]})
    let cr = R;
    let ret = 0;
    let hit = []
    while (cr > 0) {
        --cr;
        archer.forEach((e) => {
            const curhit = recur(e, cr)
            if (curhit)
                hit.push([curhit[0], curhit[1]])        
        })
        for (let i = 0; i < hit.length; ++i) {
            const [r, c] = hit[i];
            if (cpyMap[r][c] == 0) continue;
            cpyMap[r][c] = 0;
            ++ret;
        }
        hit = []
    }

    return ret;

    function recur(c, cr) {
        const visit = Array.from({length : R}, () => Array(C).fill(false))
        visit[cr][c] = true;
        let q = [[cr, c, 1]];
        let idx = 0;
        const dr = [0, -1, 0];
        const dc = [-1, 0, 1];

        while (q.length > idx) {
            const [cr, cc, dis] = q[idx++]
            if (cpyMap[cr][cc] == 1) return [cr, cc]
            if (dis == D) continue;

            for (let i = 0; i < 3; ++i) {
                const nr = cr + dr[i];
                const nc = cc + dc[i];
                if (nr < 0 || nr >= R  || nc < 0 || nc >= C) continue;
                if (visit[nr][nc]) continue;
                q.push([nr, nc, dis + 1])
                visit[nr][nc] = true;
            }
        }
        return null;
    }
}