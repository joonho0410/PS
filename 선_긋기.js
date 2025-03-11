const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const N = Number(input.shift())

let sorted = input.map((x) => {
    const [s, e] = x.split(' ').map(Number)
    return [s, e]
})
sorted = sorted.sort((a, b) => {
    const [ax, ay] = a;
    const [bx, by] = b;
    if (ax != bx) return ax - bx;
    return ay - by
})

let [start, end] = sorted.shift()
let len = 0;

for (line of sorted) {
    const [st, ed] = line;
    if (st <= end) {
        end = Math.max(end, ed);
        continue;
    }
    len += end - start
    start = st;
    end = ed;
}

len += end - start
console.log(len)