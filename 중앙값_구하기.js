class min_pq {
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
        return 2 * idx + 1; 
    }
    rc(idx) {
        return 2 * idx + 2;
    }
    push(val) {
        this.heap.push(val)
        let idx = this.heap.length - 1;
        while (idx > 0) {
            let p = this.parent(idx)
            if (this.heap[p] <= this.heap[idx]) break;
            this.swap(p, idx)
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
            let minidx = curidx;

            if (lc < this.heap.length && this.heap[lc] < this.heap[minidx]) minidx = lc;
            if (rc < this.heap.length && this.heap[rc] < this.heap[minidx]) minidx = rc;
            if (minidx == curidx) break;
            this.swap(minidx, curidx)
            curidx = minidx;
        }
    }
    top() {
        return this.heap[0]
    }
    size() {
        return this.heap.length;
    }
}

class max_pq {
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
        return 2 * idx + 1; 
    }
    rc(idx) {
        return 2 * idx + 2;
    }
    push(val) {
        this.heap.push(val)
        let idx = this.heap.length - 1;
        while (idx > 0) {
            let p = this.parent(idx)
            if (this.heap[p] >= this.heap[idx]) break;
            this.swap(p, idx)
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
            let minidx = curidx;

            if (lc < this.heap.length && this.heap[lc] > this.heap[minidx]) minidx = lc;
            if (rc < this.heap.length && this.heap[rc] > this.heap[minidx]) minidx = rc;
            if (minidx == curidx) break;
            this.swap(minidx, curidx)
            curidx = minidx;
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
let input = fs.readFileSync(0).toString().trim().split('\n')
let T = Number(input.shift())

while (T --) {
    const N = Number(input.shift())
    const line = Math.floor(N / 10) + 1;
    const ary = []
    const right = new min_pq()
    const left = new max_pq()
    const ans = []
    left.push(-Infinity)
    right.push(Infinity)

    for (let i = 0; i < line; ++i) {
        ary.push(...input[i].split(' ').map(Number))
    }

    for (let i = 0; i < ary.length; ++i) {
        if (ary[i] < right.top()) left.push(ary[i])
        else right.push(ary[i])
        
        if (i % 2 == 1) continue;
        while (left.size() != right.size() + 1) {
            if (left.size() > right.size()) {
                right.push(left.top())
                left.pop()
                continue;        
            }
            if (left.size() <= right.size()) {
                left.push(right.top())
                right.pop();
                continue;
            }
        }
        ans.push(left.top())
    }
    print(ans)
    input = input.slice(line)
}

function print(ary) {
    console.log(ary.length)
    for (let i = 0; i < Math.ceil(ary.length / 10); ++i) {
        console.log(ary.slice(i * 10, i * 10 + 10).join(' '))
    }
}