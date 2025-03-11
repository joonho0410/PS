const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

for (let i = 0; i < 4; ++i) {
    let [x, y, p, q, x2, y2, p2, q2] = input.shift().split(' ').map(Number)
    if (x > x2) [x, p, x2, p2] = [x2, p2, x, p]
    if (y > y2) [y, q, y2, q2] = [y2, q2, y, q] 
    const c1 = cmp(x2, x, p)
    const c2 = cmp(y2, y ,q)
    if (c1 == -1 || c2 == -1) console.log('d')
    else if (c1 == 2 && c2 == 2) console.log('c')
    else if (c1 == 1 && c2 == 1) console.log('a')
    else console.log('b')

}

function cmp(t, l, h){
    if (l <= t && t < h) return 1;
    if (t == h) return 2;
    return -1;
}