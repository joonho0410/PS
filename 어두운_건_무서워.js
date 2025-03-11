const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [R, C, T] = input.shift().split(' ').map(Number)
const psum = Array.from({length : R}, () => Array(C + 1).fill(0n))
const map = []

for (let i = 0; i < R; ++i) {
    map.push(input[i].split(' ').map(BigInt))
}
for (let r = 0; r < R; ++r) {
    let sum = 0n;
    for (let c = 0; c < C; ++c) {
        sum += map[r][c];
        psum[r][c + 1] = sum;
    }
}

input.splice(0, R)

for (let i = 0; i < T; ++i) {
    const [sr, sc, er, ec] = input[i].split(' ').map(Number)
    const ans = findAns(sr - 1, sc, er - 1, ec)
    console.log(String(ans))
}

function findAns(sr, sc, er, ec) {
    let sum = 0n;
    const div = BigInt((er - sr + 1) * (ec - sc + 1))
    for (let r = sr; r <= er; ++r) {
        sum += psum[r][ec] - psum[r][sc - 1]
    }
    return sum / div
}