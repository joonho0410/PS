class pq {
    constructor() {
        this.heap = []
    }
    swap(a, b) {
        [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]]
    }
    p(idx) {
        return Math.floor((idx - 1) / 2)
    }
    lc(idx) {
        return 2 * idx + 1;
    }
    rc(idx) {
        return 2 * idx + 2;
    }
    push(val) {
        this.heap.push(val);
        let idx = this.heap.length - 1
        while (idx > 0) {
            const p = this.p(idx)
            if (this.heap[p][0] < this.heap[idx][0]) break;
            this.swap(p, idx);
            idx = p;
        }
    }
    pop() {
        this.swap(this.heap.length - 1, 0)
        this.heap.pop()
        let curidx = 0;
        while (1) {
            const lc = this.lc(curidx)
            const rc = this.rc(curidx)
            let minidx = curidx
            if (lc < this.heap.length && this.heap[lc][0] < this.heap[minidx][0]) minidx = lc;
            if (rc < this.heap.length && this.heap[rc][0] < this.heap[minidx][0]) minidx = rc;
            if (minidx === curidx) break;
            
            this.swap(minidx, curidx)
            curidx = minidx
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

let T = Number(input.shift())

while(T--) {
    const [N, D, C] = input[0].split(' ').map(Number)
    const adj = Array.from({length : N + 1}, () => [])
    for (let i = 0; i < D; ++i) {
        const [a, b, s] = input[i + 1].split(' ').map(Number)
        adj[b].push([a, s])
    }

    console.log(dijkstra(C))
    
    function dijkstra(start) {
        const dist = Array(N + 1).fill(Infinity)
        dist[start] = 0;
        const q = new pq()
        q.push([0, start]) // [dist, node]

        while (q.size()) {
            const [dis, node] = q.top();
            q.pop();
            if (dis > dist[node]) continue;

            for (e of adj[node]) {
                const [next, ndis] = e;
                if (dis + ndis >= dist[next]) continue;
                dist[next] = dis + ndis;
                q.push([dis + ndis, next])
            }
        }
        
        let time = 0;
        let cnt = 0;
        for (let i = 1; i <= N; ++i) {
            if (dist[i] === Infinity) continue;
            time = Math.max(dist[i], time);
            ++cnt;
        }
        return [cnt, time].join(' ')
    }


    input.splice(0, D + 1)
}
