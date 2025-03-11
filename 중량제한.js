class pq {
    constructor() {
        this.heap = [] // [node, weight]
    }
    swap(a, b) {
        [this.heap[a], this.heap[b]] = [this.heap[b] , this.heap[a]]
    }
    p(idx) {
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
            const p = this.p(idx);
            if (this.heap[p][1] >= this.heap[idx][1]) break;
            this.swap(p, idx);
            idx = p;
        }
    }
    pop() {
        this.swap(0, this.heap.length - 1);
        this.heap.pop();
        let curidx = 0;
        
        while (1) {
            const lc = this.lc(curidx)
            const rc = this.rc(curidx)
            let maxidx = curidx;

            if (lc < this.heap.length && this.heap[lc][1] > this.heap[maxidx][1]) maxidx = lc;
            if (rc < this.heap.length && this.heap[rc][1] > this.heap[maxidx][1]) maxidx = rc;
            if (maxidx == curidx) break;
            this.swap(curidx, maxidx)
            curidx = maxidx;
        }
    }
    top() {
        return this.heap[0];
    }
    size() {
        return this.heap.length;
    }
}

const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [N, M] = input.shift().split(' ').map(Number)
const adj = Array.from({length: N + 1}, () => [])

for (let i = 0; i < M; ++i){
    const [s, e, w] = input[i].split(' ').map(Number)
    adj[s].push([e, w]);
    adj[e].push([s, w]);
}

const [S, E] = input[M].split(' ').map(Number)
console.log(dijkstra())

function dijkstra() {
    const dp  = Array(N + 1).fill(0);
    const visit = Array(N + 1).fill(false);

    const q = new pq()
    q.push([S, Infinity])

    while (q.size() > 0) {
        const [node, w] = q.top();
        visit[node] = true;
        if (node === E) return w;
             
        q.pop();

        for (roads of adj[node]) {
            const [next, nw] = roads;
            const min = Math.min(w, nw)
            if (visit[next]) continue;
            if (min <= dp[next]) continue;
            dp[next] = min;
            q.push([next, dp[next]]); 
        }
    }
}