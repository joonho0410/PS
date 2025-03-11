const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [N, M] = input.shift().split(' ').map(Number)
const visit = Array(N + 1).fill(false)
const dis = Array(N + 1).fill(-1);
const adj = Array.from({length : N + 1}, () => [])

for (let i = 0; i < M; ++i) {
    const [s, e] = input[i].split(' ').map(Number)
    adj[s].push(e)
    adj[e].push(s)
}

const far = bfs();
let num = 0;
let cnt = 0;

for (let i = 1; i <= N; ++i){
    if (dis[i] == far) {
        if (cnt == 0) num = i;
        ++cnt;
    }
}
console.log(num, dis[num], cnt);

function bfs() {
    let ans = 0;
    visit[1] = true;
    dis[1] = 0;
    const q = [[1, 0]] // [node, dis]
    let idx = 0;

    while (q.length > idx) {
        const [cn, cdis] = q[idx++]
        ans = Math.max(ans, cdis);

        for (next of adj[cn]) {
            if (visit[next]) continue;
            visit[next] = true
            dis[next] = cdis + 1
            q.push([next, cdis + 1])
        }
    }
    
    return ans;
}
