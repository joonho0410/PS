const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [x1, y1, x2, y2, x3, y3, x4, y4] = input.shift().split(' ').map(Number)

const AB = [x2 - x1, y2 - y1]
const AC = [x2 - x3, y2 - y3]
const AD = [x2 - x4, y2 - y4]

const d1 = CCW(AB, AC);
const d2 = CCW(AB, AD)

if (d1 * d2 < 0) console.log(1)
else console.log(0)

function CCW(v1, v2) {
    const [x1, y1] = v1;
    const [x2, y2] = v2;

    return x1 * y2 - x2 * y1
}
