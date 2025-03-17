const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [N, M] = input.shift().split(' ').map(Number)
const ary = [0].concat(input.map(Number))
const inc = Array.from({length : N + 1}, () => [0].concat(Array(M + 1).fill(-Infinity)))
const not_inc = Array.from({length : N + 1}, () => [0].concat(Array(M + 1).fill(-Infinity)))

for (let idx = 1; idx <= N; ++idx) {
    for (let cnt = 1; cnt <= M; ++cnt) {
        not_inc[idx][cnt] = Math.max(inc[idx - 1][cnt], not_inc[idx - 1][cnt])
        inc[idx][cnt] = Math.max(inc[idx - 1][cnt], not_inc[idx - 1][cnt - 1]) + ary[idx];
    }
}

console.log(Math.max(inc[N][M], not_inc[N][M]))