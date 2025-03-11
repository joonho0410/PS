const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [x1, y1, x2, y2] = input.shift().split(' ').map(Number)
const [x3, y3, x4, y4] = input.shift().split(' ').map(Number)

const l = CCW([x1, y1], [x2, y2], [x3, y3]) * CCW([x1, y1], [x2, y2], [x4, y4])
const r = CCW([x3, y3], [x4, y4], [x1, y1]) * CCW([x3, y3], [x4, y4], [x2, y2])

if (l < 0 && r < 0) console.log('1')
else console.log('0')
function CCW([x1, y1], [x2, y2], [x3, y3]) {
    return (x1*y2 + x2*y3 + x3*y1) - (x2*y1 + x3*y2 + x1*y3)    
}
