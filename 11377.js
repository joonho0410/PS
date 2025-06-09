const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [N, M, K] = input.shift().split(' ').map(Number)

const OFFSET = 1000;
const MAX = 2003;
const SINK = 2001;
const ADDITION = 2002;
const SOURCE = 0;

const adj = Array.from({length : MAX}, () => [])

const flow = Array.from({length : MAX}, () => Array(MAX).fill(0))
const capacity = Array.from({length : MAX}, () => Array(MAX).fill(0)) 

// Connect WORK & WORKER
adj[SOURCE].push(ADDITION);
adj[ADDITION].push(SOURCE);
capacity[SOURCE][ADDITION] = K;

for (let i = 0; i < N; ++i) {
    const works = input[i].split(' ').map(Number).slice(1)
    const worker = i + 1;

    capacity[SOURCE][worker] = 1
    capacity[ADDITION][worker] = 1;
    adj[SOURCE].push(worker)
    adj[ADDITION].push(worker)
    adj[worker].push(SOURCE)
    adj[worker].push(ADDITION)
    
    for (const work of works) {
        capacity[worker][work + OFFSET] = 1; 
        adj[work + OFFSET].push(worker)
        adj[worker].push(work + OFFSET)
    }
}
for (let i = 0; i < M; ++i) {
    capacity[i + 1 + OFFSET][SINK] = 1;
    adj[SINK].push(i + 1 + OFFSET)
    adj[i + 1 + OFFSET].push(SINK)
}

let ans = 0;
while (1) {
    const parent = Array(MAX).fill(-1)
    parent[SOURCE] = SOURCE
    const q = [SOURCE]
    let idx = 0;

    while (q.length > idx && parent[SINK] === -1) {
        const here = q[idx++]

        for (const there of adj[here]) {
            if (parent[there] !== -1 || capacity[here][there] - flow[here][there] <= 0) continue;
            parent[there] = here;
            q.push(there);
        }
    }
    
    if (parent[SINK] === -1) break;

    let there = SINK
    let min = Infinity;
    
    while (there !== SOURCE) {
        const here = parent[there];
        min = Math.min(min, capacity[here][there] - flow[here][there]);
        there = here;
    }

    there = SINK;

    while (there !== SOURCE) {
        const here = parent[there]
        flow[here][there] += min;
        flow[there][here] -= min;
        there = here;
    }

    ans += min;
}

console.log(ans)
