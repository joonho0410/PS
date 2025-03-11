const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [N, M] = input.shift().split(' ').map(Number)

const ori = []
const target = []
const diff = Array.from({length : N}, () => Array(M).fill(0))
const posi = [[1, 1, 1], [1, 0, 0, 1], [1, 1, 0, 1, 1]]

for (let i = 0; i < N; ++i) {
    ori.push(input[i].split('').map(Number))
}
input.splice(0, N);
for (let i =0; i < N; ++i) {
    target.push(input[i].split('').map(Number))
}

console.log(solve())

function solve() {
    let ans = 0;
    let f = findDiff()
    if ((N < 3 || M < 3) && f > 0) return -1;
    if (f == 0) return 0;

    for (let i = 0; i < N - 2; ++i){
        for (let j = 0; j < M - 2; ++j){
            if (diff[i][j] != 1) continue;
            flip(i, j)
            ++ans;
        }
    }

    for (let i = 0; i < N; ++i)
        for (let j = 0; j < M; ++j)
            if (diff[i][j] == 1) return -1;
    return ans;
}

function flip(r, c){
    for (let j = 0; j < 3; ++j) {
        for (let i = 0; i < 3; ++i) {
            const d = diff[r + j][c + i] == 1 ? 0 : 1
            diff[r + j][c + i] = d;
        }
    }
}

function findDiff() {
    let ret = 0;
    for (let i = 0; i < N; ++i) {
        for (let j = 0; j < M; ++j){
            if (ori[i][j] == target[i][j]) diff[i][j] = 0;
            if (ori[i][j] != target[i][j]) {
                diff[i][j] = 1;
                ++ret
            }
        }
    }
    return ret;
}