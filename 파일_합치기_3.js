class pq {
    constructor() {
        this.heap = []
    }
    swap(a, b) {
        [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]]
    }
    lc(idx) {
        return 2 * idx + 1;
    }
    rc(idx) {
        return 2 * idx + 2
    }
    p(idx) {
        return Math.floor((idx - 1) / 2)
    }
    push(val) {
        this.heap.push(val)
        let curidx = this.heap.length - 1
        while (curidx > 0) {
            const p = this.p(curidx);
            if (this.heap[p] <= this.heap[curidx]) break;
            this.swap(p, curidx)
            curidx = p;
        }
    }
    pop() {
        this.swap(0, this.heap.length - 1);
        this.heap.pop();
        let curidx = 0;
        while (1) {
            let minidx = curidx;
            let lc = this.lc(curidx)
            let rc = this.rc(curidx)
            if (lc < this.heap.length && this.heap[lc] < this.heap[minidx]) minidx = lc;
            if (rc < this.heap.length && this.heap[rc] < this.heap[minidx]) minidx = rc;
            if (minidx === curidx) break;
            this.swap(minidx, curidx)
            curidx = minidx
        }
    }
    top() {
        return this.heap[0]
    }
    size() {
        return this.heap.length;
    }

}

const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

let T = Number(input.shift())

while (T--) {
    let ans = 0;
    const q = new pq();
    const n = Number(input[0])
    const ary = input[1].split(' ').map(Number)
    ary.forEach((e) => q.push(e))
    
    while (q.size() >= 2) {
        const t1 = q.top();
        q.pop();
        const t2 = q.top();
        q.pop();
        q.push(t1 + t2);
        ans += t1 + t2
    }
    console.log(ans)
    input.splice(0, 2);
}