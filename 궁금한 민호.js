const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const N = Number(input.shift())
const map = []
const dp = Array.from({length : N}, () => Array(N).fill(null))

for (let i = 0; i < N; ++i) {
    map.push(input[i].split(' ').map(Number))
}

let invalid = false;

solve()

function solve() {
    
    for (let s = 0; s < N; ++s) {
        for (let e = 0; e < N; ++e) {
            if (s === e || dp[s][e] !== null) continue;
            findShortest(s, e)
        }
    }
    
    if (invalid) {
        console.log(-1)
        return; 
    }
    getAns()
}

function getAns() {
    const ans = new Set();
    for (let i = 0; i < N; ++i) {
        for (let j = 0; j < N; ++j) {
            if (dp[i][j] === null) continue;
            ans.add(...dp[i][j])        
        }
    }

    let sum = 0;
    for (const ele of ans) {
        const s = Math.floor(ele / N)
        const e = ele % N

        sum += map[s][e]
    }
    console.log(sum / 2)
}

function findShortest(s, e) {
    if (dp[s][e] !== null) return dp[s][e];
    const roads = new Set();

    for (let m = 0; m < N; ++m) {
        if (m === s || m === e) continue;
        if (map[s][e] > map[s][m] + map[m][e]) invalid = true;
        if (map[s][e] === map[s][m] + map[m][e]) {
            roads.add(...findShortest(s, m));
            roads.add(...findShortest(m, e));
        }
    }
    
    if (roads.size === 0) roads.add(s * N + e)
    dp[s][e] = roads;
    return roads;
}
