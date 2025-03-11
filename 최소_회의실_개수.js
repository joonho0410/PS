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

const N = Number(input.shift())
const q = new pq()
input.sort((a, b) => 
    a.split(' ').map(Number)[0] - b.split(' ').map(Number)[0]
)
let cnt = 0;
let ans = 0;
for (let i = 0; i < N; ++i) {
    const [s, e] = input[i].split(' ').map(Number)
    if (q.size() === 0) { q.push([e]); ++cnt; continue; } 
    while (q.size()) {
        const [t] = q.top();
        if (s < t) break;
        q.pop();
        --cnt; 
    }
    ans = Math.max(++cnt, ans)
    q.push([e])
}

console.log(ans)