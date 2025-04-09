const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [N, M, X] = input.shift().split(' ').map(Number)
const degree = Array(N + 1).fill(0)
const adj = Array.from({length : N + 1}, () => [])
const revAdj = Array.from({length : N + 1}, () => [])

for (let i = 0; i < M; ++i) {
    const [a, b] = input[i].split(' ').map(Number)
    adj[a].push(b);
    revAdj[b].push(a);
}

console.log(findMin(), N - findMax());

function findMin() {
    const visit = Array(N + 1).fill(false)
    visit[X] = true;
    const q = [X]
    let idx = 0;
    let lv = 1;

    while (q.length > idx) {
        const node = q[idx++];
        
        for (next of revAdj[node]) {
            if (visit[next]) continue;
            visit[next] = true;
            ++lv;
            q.push(next);
        }
    }
    
    return lv;
}

function findMax() {
    const visit = Array(N + 1).fill(false)
    visit[X] = true;
    const q = [X]
    let idx = 0;
    let lv = 0;

    while (q.length > idx) {
        const node = q[idx++]

        for (next of adj[node]) {
            if (visit[next]) continue;
            visit[next] = true;
            ++lv;
            q.push(next)
        }
    }
    return lv;
}
