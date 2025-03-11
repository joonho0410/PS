const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
let T = Number(input.shift())

while (T--) {
    const [len, n] = input[0].split(' ').map(Number)
    const ants = []
    let min = 0
    let max = 0

    for (let i = 0; i < n; ++i) {
        ants.push(Number(input[i + 1]))
    }
    ants.sort((a, b) => a - b)
    for (ant of ants) {
        min = Math.max(min, Math.min(len - ant, ant));
    }
    for (ant of ants) {
        max = Math.max(max, Math.max(len - ant, ant))
    }

    console.log(min, max)
    input.splice(0, n + 1);
}