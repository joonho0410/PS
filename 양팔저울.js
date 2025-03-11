const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const K = Number(input.shift())
const choo = input.shift().split(' ').map(Number)
const set = new Set()

let sum = 0
for (e of choo) {
    sum += e;
}

for (e of choo) {
    const ary = []
    for (s of set) {
        ary.push(Math.abs(s - e))
        ary.push(s + e)
    }
    for (a of ary) {
        if (a != 0)
        set.add(a)
    }
    set.add(e)
}

console.log(sum - [...set].length)

