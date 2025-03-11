const fs = require('fs')
const input = fs.readFileSync(0).toString().trim()
const N = Number(input)
const p = Array(N + 1).fill(0)

solve()

function solve() {
    init()
    bfs()
    let ans = findAns()
    console.log(ans.length - 1)
    console.log(ans.join(' '))
}

function init() {
    for (let i = 0; i <= N; ++i)   
        p[i] = i;
}

function bfs() {
    let q = [N]
    let idx = 0;
    while (q.length > idx) {
        let cur = q[idx++]

        if (cur == 1) break;
        if (cur % 3 == 0 && p[cur / 3] == cur / 3) {
            p[cur / 3] = cur;
            q.push(cur / 3)
        }
        if (cur % 2 == 0 && p[cur / 2] == cur / 2) {
            p[cur / 2] = cur;
            q.push(cur / 2)
        }
        if (p[cur - 1] == cur - 1){
            p[cur - 1] = cur;
            q.push(cur - 1)
        }
    }
}

function findAns() {
    let n = 1;
    let ans = []
    while (1) {
        ans.push(n);
        if (p[n] == n) break;
        n = p[n];
    }
    
    return ans.reverse()
}