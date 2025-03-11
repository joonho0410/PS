const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const N = Number(input.shift())
const dot = []
for (let i = 0; i < N; ++i) {
    const [x, y] = input[i].split(' ').map(Number)
    dot.push([x, y]);
}