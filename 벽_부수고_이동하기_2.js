class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.head = null;
        this.rear = null;
        this.length = 0;
    }
    push(val) {
        const newNode = new Node(val)
        ++this.length;
        if (this.head === null) {
            this.head = newNode;
            this.rear = newNode;
            return ;
        }
        this.rear.next = newNode;
        this.rear = newNode;
    }
    pop() {
        if (this.length === 0) return ;
        --this.length;
        const ret = this.head.val;
        const nextHead = this.head.next;
        this.head.next = 0;
        this.head = nextHead;
        return ret;
    }
}

const fs = require('fs');
const { relative } = require('path');
const input = fs.readFileSync(0).toString().trim().split('\n')
const [R, C, K] = input.shift().split(' ').map(Number)
const visit = Array(R * C * (K + 1)).fill(false)
const dr = [0, 0, 1, -1]
const dc = [1, -1, 0, 0]
const map =[]
const q = new Queue();

for (let i = 0; i < R; ++i) {
    map.push(input[i].split('').map(Number))
}

const ret = bfs()
ret === null ? console.log(-1) : console.log(ret + 1) 

function bfs() {
    visit[0] = true;
    q.push([0, 0, 0, 0])
    let idx = 0;
    
    while (q.length > idx) {
        const [r, c, k, dis] = q.pop()
        if (r == R - 1 && c == C - 1) return dis;
        
        for (let i = 0; i < 4; ++i) {
            const nr = r + dr[i]
            const nc = c + dc[i]
            const visitIdx = nr * (C * (K + 1)) + nc * (K + 1)

            if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;
            if (map[nr][nc] == 0) {
                if (check(visitIdx , k)) continue;
                visit[visitIdx + k] = true;
                q.push([nr, nc, k, dis + 1])
            }
            if (map[nr][nc] == 1) {
                if (k >= K) continue;
                if (check(visitIdx, k + 1)) continue;
                visit[visitIdx + k + 1] = true;
                q.push([nr, nc, k + 1, dis + 1])
            }
        }
    }

    return null;
}

function check(visitIdx, k) {
    for (let i = 0; i <= k; ++i) {
        if (visit[visitIdx + i]) return true;
    }
    return false;
}