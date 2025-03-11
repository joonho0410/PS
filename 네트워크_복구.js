class pq {
    constructor() {
        this.heap = []
    }
    swap(a, b){
        [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]]
    }
    lc (idx) {
        return 2 * idx + 1
    }
    rc (idx) {
        return 2 * idx + 2
    }
    p (idx) {
        return Math.floor((idx - 1) / 2)
    }
    push(val) {
        this.heap.push(val)
        let idx = this.heap.length - 1;
        while (idx > 0) {
            let p = this.p(idx)
            if (this.heap[p][0] <= this.heap[idx][0]) break;
            this.swap(p, idx)
            idx = p;
        }
    }
    pop(){
        this.swap(0, this.heap.length - 1)
        this.heap.pop()
        let idx = 0;
        while (1) {
            const lc = this.lc(idx)
            const rc = this.rc(idx)
            let minidx = idx;
            if (lc < this.heap.length && this.heap[lc][0] < this.heap[minidx][0]) minidx = lc
            if (rc < this.heap.length && this.heap[rc][0] < this.heap[minidx][0]) minidx = rc
            if (minidx == idx) break;
            this.swap(idx, minidx)
            idx = minidx;
        }
    }
    top(){
        return this.heap[0]
    }
    size(){
        return this.heap.length;
    }
}

const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [N, M] = input.shift().split(' ').map(Number)
const adj = Array.from({length : N + 1}, () => [])
const dist = Array(N + 1).fill(Infinity);
const p = Array(N + 1).fill(0)

for (let i = 1; i <= N; ++i)
    p[i] = i;
for (let i = 0; i < M; ++i) {
    const [a, b, d] = input[i].split(' ').map(Number)
    adj[a].push([b, d])
    adj[b].push([a, d])
}

dijkstra()
const visit = Array.from({length : N + 1}, () => Array(N + 1).fill(false))
const ans = []
for (let i = 2; i <= N; ++i) {
    let n = i;
    while(p[n] != n) {
        if (!visit[n][p[n]]) {
            visit[n][p[n]] = true;
            ans.push([n, p[n]])
        }
        n = p[n];
    }
}

console.log(ans.length)
console.log(ans.map((e) => e.join(' ')).join('\n'))

function dijkstra() {
    const q = new pq();
    dist[1] = 0;
    q.push([0 , 1]) // [dis, node]

    while (q.size() > 0) {
        const [cdis, cnode] = q.top();
        q.pop();
        if (dist[cnode] < cdis) continue;

        for (edge of adj[cnode]) {
            const [nnode, ndis] = edge;
            if (dist[nnode] <= cdis + ndis) continue;
            dist[nnode] = cdis + ndis;
            p[nnode] = cnode;
            q.push([dist[nnode], nnode])            
        }
    }    
}
