class pq {
    constructor(){
        this.heap = []
    }
    swap(a, b) {
        [this.heap[a], this.heap[b]] = [this.heap[b],this.heap[a]];
    }
    lc (idx) {
        return 2 * idx  + 1;
    }
    rc (idx) {
        return 2 * idx + 2
    }
    p (idx) {
        return Math.floor((idx - 1) / 2 );
    }
    push(val) {
        this.heap.push(val);
        let idx = this.heap.length - 1
        while (idx > 0) {
            let p = this.p(idx);
            if (this.heap[p] < this.heap[idx]) break;
            this.swap(p, idx)
            idx = p;            
        }
    }
    pop() {
        this.swap(0, this.heap.length - 1)
        this.heap.pop();
        let idx = 0;
        while (1) {
            let lc = this.lc(idx);
            let rc = this.rc(idx);
            let minidx = idx;

            if (lc < this.heap.length && this.heap[lc] < this.heap[minidx]) minidx = lc;
            if (rc < this.heap.length && this.heap[rc] < this.heap[minidx]) minidx = rc;
            if (minidx == idx) break;

            this.swap(minidx, idx);
            idx = minidx;
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

let [N, M] = input.shift().split(' ').map(BigInt)
const ary = input.shift().split(' ').map(BigInt)

const q = new pq();
for (ele of ary) {
    q.push(ele);
}

while (!!(M--)) {
    const a = q.top();
    q.pop();
    const b = q.top();
    q.pop();
    const next = a + b;
    q.push(next);
    q.push(next);   
}

let ans = 0n;
while (q.size() > 0 ){
    ans += q.top();
    q.pop();
}
console.log(String(ans))