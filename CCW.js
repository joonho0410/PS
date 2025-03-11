const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [x1, y1] = input.shift().split(' ').map(Number)
const [x2, y2] = input.shift().split(' ').map(Number)
const [x3, y3] = input.shift().split(' ').map(Number)

console.log(solve())
function solve() {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dx2 = x3 - x2;
    const dy2 = y3 - y2;

    const v1 = [dx, dy];
    const v2 = [dx2, dy2];

    if (dx * dy2 - dx2 * dy > 0) return 1;
    if (dx * dy2 - dx2 * dy < 0) return -1;
    return 0;
}
 