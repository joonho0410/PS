class pq {
    constructor() {
        this.heap = []
    }
    swap(a, b) {
        [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]]
    }
    parent(idx) {
        return Math.floor((idx - 1) / 2)
    }
    lc(idx) {
        return 2 * idx + 1
    }
    rc(idx) {
        return 2 * idx + 2
    }
    push(val) {
        this.heap.push(val);
        let idx = this.heap.length - 1;
        while (idx > 0) {
            const p = this.parent(idx)
            if (this.heap[p][0] < this.heap[idx][0]) break;
            this.swap(p, idx);
            idx = p;
        }
    }
    pop() {
        this.swap(0, this.heap.length - 1)
        this.heap.pop();
        let idx = 0;
        while (1) {
            let minidx = idx;
            const lc = this.lc(idx);
            const rc = this.rc(idx);
            if (lc < this.heap.length && this.heap[lc][0] < this.heap[minidx][0]) minidx = lc;
            if (rc < this.heap.length && this.heap[rc][0] < this.heap[minidx][0]) minidx = rc;
            if (minidx == idx) break;
            this.swap(minidx, idx)
            idx = minidx;
        }
    }
    top() {
        return this.heap[0];
    }
    size() {
        return this.heap.length
    }
}

const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split("\n")

const [N, M] = input.shift().split(' ').map(Number)
const dp = Array(N + 1).fill(Infinity)
const adj = Array.from({length : N + 1}, () => [])

for (let i = 0; i < M; ++i) {
    const [s, e, c] = input[i].split(' ').map(Number)
    adj[s].push([e, c])
    adj[e].push([s, c])
}

dp[1] = 0;
dijkstra();
console.log(dp[N])

function dijkstra() {
    const q = new pq();
    q.push([0, 1])

    while (q.size() > 0) {
        const [dis, node] = q.top();
        q.pop();
        if (dp[node] < dis) continue;

        for (road of adj[node]) {
            const [next, cost] = road;
            if (dp[next] <= dis + cost) continue;
            dp[next] = dis + cost;
            q.push([dis + cost, next])
        }
    }
}