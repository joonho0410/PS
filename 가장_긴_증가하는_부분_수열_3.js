const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const N = Number(input.shift())
const ary = input.shift().split(' ').map(Number)

const q = [ary[0]]

for (let i = 1; i < ary.length; ++i) {
    if (q[q.length - 1] < ary[i]) { q.push(ary[i]); continue; }
    const idx = bisect(ary[i])
    q[idx] = ary[i];
}
console.log(q.length)

function bisect(n) {
    let s = 0;
    let e = q.length - 1

    while (s <= e) {
        let mid = Math.floor((s + e) / 2);
        if (q[mid] < n)
            s = mid + 1;
        if (q[mid] >= n)
            e = mid - 1;
    }
    return s;
}