const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [N, S, E, T] = input.shift().split(' ').map(Number)
const adj = []
const MOD = 1000003;

for (let i = 0; i < input.length; ++i) {
    adj.push(input[i].split('').map(Number))
}

solve();

function solve() {
    const s = S - 1;
    const e = E - 1;
   
    const defaultM = init();
    const ans = recur(T)

    function recur(n) {
        if (n === 1) return defaultM

        const mid = Math.floor(n / 2)
        const save = recur(mid)
        const next = multi(save, save);
        
        if (n % 2 === 0) return next;
        return multi(next, defaultM)
    }
    
    console.log(ans[5 * s][5 * e])
}

function init(){
    const defaultMat = Array.from({length : 5 * N}, () => Array(5 * N).fill(0))

    for (let s = 0; s < N; ++s) {
        for (let t = 1; t < 5; ++t) {
            defaultMat[5 * s + t][5 * s + t - 1] = 1;
        }
    }

    for (let r = 0; r < N; ++r) {
        for (let c = 0; c < N; ++c) {
            if (adj[r][c] === 0) continue;
            const time = adj[r][c];
            defaultMat[r * 5][c * 5 + time - 1] = 1;
        }
    }   

    return defaultMat;
}

function multi(mat1, mat2) {
    const newMat = Array.from({length : 5 * N}, () => Array(5 * N).fill(0))
    for (let i = 0; i < 5 * N; ++i) {
        for (let j = 0; j < 5 * N; ++j) {
            for (let k = 0; k < 5 * N; ++k) {
                newMat[i][j] = (newMat[i][j] + mat1[i][k] * mat2[k][j]) % MOD
            }
        }
    }
    
    return newMat;
}
