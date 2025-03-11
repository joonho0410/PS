class pq {
    constructor() {
        this.heap = []
    }
    swap(a, b) {
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
            const p = this.p(idx)
            if (this.heap[p][0] < this.heap[idx][0]) break;
            this.swap(p, idx)
            idx = p;
        }
    }
    pop() {
        this.swap(0, this.heap.length - 1)
        this.heap.pop();
        let idx = 0;
        while (1) {
            let lc = this.lc(idx)
            let rc = this.rc(idx)
            let minidx = idx;
            if (lc < this.heap.length && this.heap[lc][0] < this.heap[minidx][0]) minidx = lc;
            if (rc < this.heap.length && this.heap[rc][0] < this.heap[minidx][0]) minidx = rc;
            if (minidx == idx) break;
            this.swap(minidx, idx);
            idx = minidx;
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
    const [n, m, t] = input[0].split(' ').map(Number)
    const [s, g ,h] = input[1].split(' ').map(Number)
    const adj = Array.from({length : n + 1}, () => [])
    const targets = []
    for (let i = 2; i < m + 2; ++i){
        const [s, e, d] = input[i].split(' ').map(Number)
        adj[s].push([e, d])
        adj[e].push([s, d])
    }
    for (let i = m + 2; i < m + t + 2; ++i){
        targets.push(Number(input[i]))
    }
    console.log(dijkstra().join(' '))
    input.splice(0, m + t + 2)

    function dijkstra() {
        const q = new pq()
        const distance = Array.from({length: n + 1}, () => [Infinity, false])
        distance[s] = [0, false]
        q.push([0, s, false]) // [distance, node, use road?]
        
        while (q.size() > 0) {
            const [dis, node, used] = q.top()
            q.pop()
            if (dis > distance[node][0]) continue;

            for (road of adj[node]) {
                const [next, ndis] = road
                if (distance[next][0] < dis + ndis) continue;
                let nUse = false;
                if (node == g && next == h) nUse = true;
                if (node == h && next == g) nUse = true;
                if (used) nUse = true;
                if (distance[next][0] == dis + ndis && (!nUse || distance[next][1])) continue;
                distance[next] = [dis + ndis, nUse]
                q.push([dis + ndis, next, nUse])                   
            }
        }
        
        let ans = []
        for (target of targets) {
            if (distance[target][1])
                ans.push(target)
        }
        ans = ans.sort((a, b) => {return a - b})
        return ans;
    }
}