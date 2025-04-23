const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

let [x1, y1, x2, y2] = input.shift().split(' ').map(Number)
let [x3, y3, x4, y4] = input.shift().split(' ').map(Number)

const v1 = [x1 - x2, y1 - y2]
const v2 = [x1 - x3, y1 - y3]
const v3 = [x1 - x4, y1 - y4]

const va = [x3 - x4, y3 - y4]
const vb = [x3 - x1, y3 - y1]
const vc = [x3 - x2, y3 - y2]
const ret1 = ccw(v1, v2) * ccw(v1, v3)
const ret2 = ccw(va, vb) * ccw(va, vc)

// 두개의 선분의 기울기가 같은 경우
if (ccw(v1, v2) === 0n && ccw(v1, v3) === 0n) {
   if (Math.max(x1, x2) >= Math.min(x3, x4) &&
   Math.min(x1, x2) <= Math.max(x3, x4) &&
   Math.max(y1, y2) >= Math.min(y3, y4) &&
   Math.min(y1, y2) <= Math.max(y3, y4)) console.log(1)
   else console.log(0)
   return ;
}

if (ret1 <= 0n && ret2 <= 0n) console.log(1)
else console.log(0)


function ccw(v1, v2) {
    const [x1, y1] = v1;
    const [x2, y2] = v2;

    return BigInt(x1) * BigInt(y2) - BigInt(x2) * BigInt(y1)
}

