const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const N = Number(input.shift())
const MOD = 1000000007n
const graph = Array.from({length : 8}, () => Array(8).fill(0n))
const adjs = [
    [1, 2], [1, 3],
    [2, 4], [2, 3],
    [3, 4], [3, 6],
    [4, 5], [4, 6],
    [5, 6], [5, 7],
    [6, 8],
    [7, 8]
]

for (adj of adjs) {
    const [a, b] = adj
    graph[a - 1][b - 1] = 1n; graph[b - 1][a - 1] = 1n;
}

solve()
function solve() {
    const mat = recur(N)
    console.log(String(mat[0][0]))
}

function recur(n) {
    if (n === 1) return graph
    const mat = recur(Math.floor(n / 2))
    const ret = multi(mat, mat)
    if (n % 2 === 1) return multi(ret, graph)
    return ret;
}

function multi(matrix1, matrix2) {
    const newMatrix = Array.from({length : 8}, () => Array(8).fill(0n))

    for (let r = 0; r < 8; ++r) {
        for (let c = 0; c < 8; ++c){
            for (let i = 0; i < 8; ++i) {
                newMatrix[r][c] += (matrix1[r][i] * matrix2[i][c]) % MOD
                newMatrix[r][c] = newMatrix[r][c] % MOD
            }
        }
    }

    return newMatrix
}
