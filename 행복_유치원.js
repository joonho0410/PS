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
            if (this.heap[p][0] > this.heap[idx][0]) break;
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
            if (lc < this.heap.length && this.heap[lc][0] > this.heap[minidx][0]) minidx = lc;
            if (rc < this.heap.length && this.heap[rc][0] > this.heap[minidx][0]) minidx = rc;
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
const input = fs.readFileSync(0).toString().trim().split('\n')

const [N, K] = input.shift().split(' ').map(Number)
const ary = input.shift().split(' ').map(Number)
const diff = []

for (let i = 0; i < N - 1; ++i) {
    diff.push(ary[i + 1] - ary[i])
}
diff.sort((a, b) => a - b);

let cnt = 1;
while (cnt < K) {
    diff.pop();
    ++cnt;
}

let ans = 0;
for (d of diff)  ans += d ;
console.log(ans)