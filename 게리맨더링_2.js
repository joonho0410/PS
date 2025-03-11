const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const N = Number(input.shift())
const map = []
let total = 0;

for (let i = 0; i < N ; ++i) {
    map.push(input[i].split(' ').map((e) => { total += Number(e); return Number(e)}))
}