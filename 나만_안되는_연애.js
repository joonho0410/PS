class pq {
    constructor() {
        this.heap = []
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

    swap(a, b) {
        [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]]
    }
    push(val) {
        this.heap.push(val);
        let idx = this.heap.length - 1

        while (idx > 0) {
            const p = this.parent(idx)
            if (this.heap[idx][0] >= this.heap[p][0]) break;
            this.swap(idx, p)
            idx = p;        
        }
    }
    pop() {
        this.swap(0, this.heap.length - 1);
        this.heap.pop();
        let curidx = 0;
        while (1) {
            let minidx = curidx;
            const lc = this.lc(curidx)
            const rc = this.rc(curidx)
            if (lc < this.heap.length && this.heap[lc][0] < this.heap[minidx][0]) minidx = lc;
            if (rc < this.heap.length && this.heap[rc][0] < this.heap[minidx][0]) minidx = rc;
            if (curidx === minidx) break;
            this.swap(curidx, minidx)
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

const [N, M] = input.shift().split(' ').map(Number)

const MW = [0, ...input.shift().split(' ')]
const p = Array(N + 1).fill(0)
p.forEach((e, idx) => p[idx] = idx)

const q = new pq()
let ans = 0;

for (let i = 0; i < M; ++i) {
    const [a, b, t] = input[i].split(' ').map(Number)
    q.push([t, a, b])
}

while (q.size() > 0) {
    const [t, a, b] = q.top();
    q.pop();

    if (MW[a] === MW[b]) continue; // 같은 성별
    if (!merge(a, b)) continue;
    ans += t;
}

console.log(checkAll() ? ans : -1)

function findP(a) {
    if (p[a] === a) return a;
    p[a] = findP(p[a]);
    return p[a];
}

function merge(a, b) {
    a = findP(a)
    b = findP(b)
    if (a === b) return false;
    p[b] = a;
    return true;
}

function checkAll() {
    const set = new Set();
    for (let i = 1; i <= N; ++i) {
        set.add(findP(i));
    }

    if (set.size !== 1) return false;
    return true;
}