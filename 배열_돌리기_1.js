const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [N, M, R] = input.shift().split(' ').map(Number)
const ary = input.map((e) => e.split(' ').map(Number))


rotate(0, 0, N - 1, M - 1)


console.log(ary.map((e) => e.join(' ')).join('\n'))

function rotate(lr, lc, rr, rc) {
    const len = (((rr - lr + 1) + (rc - lc + 1)) * 2 - 4) 
    const realR = R % len
    if (lr >= rr || lc >= rc) return ;

    const save = []
    for (let r = lr; r <= rr; ++r) save.push(ary[r][lc])
    for (let c = lc + 1; c <= rc; ++c) save.push(ary[rr][c])
    for (let r = rr - 1; r >= lr; --r) save.push(ary[r][rc])
    for (let c = rc - 1; c > lc; --c) save.push(ary[lr][c])

    let idx = 0;
    for (let r = lr; r <= rr; ++r) { ary[r][lc] = save[(idx + save.length - realR) % save.length]; idx++}
    for (let c = lc + 1; c <= rc; ++c) { ary[rr][c] = save[(idx + save.length - realR) % save.length]; idx++}
    for (let r = rr - 1; r >= lr; --r) { ary[r][rc] = save[(idx + save.length - realR) % save.length]; idx++}
    for (let c = rc - 1; c > lc; --c) { ary[lr][c] = save[(idx + save.length - realR) % save.length]; idx++}
    rotate(lr + 1, lc + 1, rr - 1, rc - 1)
}