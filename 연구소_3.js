const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [N, M] = input.shift().split(' ').map(Number)
const map = input.map((e) => e.split(' ').map(Number))
const virus = []
const dr = [0, 0, 1, -1];
const dc = [1, -1, 0, 0];

for (let r = 0; r < N; ++r){
    for (let c = 0; c < N; ++c){
        if (map[r][c] == 2)
            virus.push([r, c]);            
    }
}

const active = []
let ans = Infinity
recur(0);
ans === Infinity ? console.log(-1) : console.log(ans);

function recur(idx) {
    if (active.length === M) {
        const ret = findAns();
        if (ret === null) return ;
        ans = Math.min(ret, ans);
        return ;
    }
    if (idx >= virus.length) return ;
    active.push(virus[idx]);
    recur(idx + 1);
    active.pop();
    recur(idx + 1);
}

function findAns() {
    const cost = Array.from({length : N}, () => Array(N).fill(Infinity));
    let q = active.map((e) => {
        const [r, c] = e;
        cost[r][c] = 0;
        return [r, c, 0];
    })
    let idx = 0;
    let nq = [];

    while (q.length > idx) {
        const [r, c, time] = q[idx++]
        
        for (let i = 0; i < 4; ++i) {
            const nr = r + dr[i]
            const nc = c + dc[i]
            if (nr < 0 || nr >= N || nc < 0 || nc >= N) continue;
            if (map[nr][nc] == 1) continue;
            if (cost[nr][nc] <= time + 1) continue;
            cost[nr][nc] = time + 1;
            nq.push([nr, nc, time + 1])
        }

        if (q.length == idx) {
            q = [...nq];
            nq = [];
            idx = 0;
        }
    }
    
    let ret = 0;
    for (let r = 0; r < N; ++r){
        for (let c = 0; c < N; ++c){
            if (map[r][c] == 1) continue;
            if (map[r][c] == 2) continue;
            if (cost[r][c] === Infinity) return null;
            ret = Math.max(ret, cost[r][c]);
        }
    }

    return ret;
}