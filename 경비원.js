const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [C, R] = input.shift().split(' ').map(Number)
const N = Number(input.shift())
const ary = []
let ans = 0;

for (let i = 0; i < N; ++i) {
    const [dir, loca] = input[i].split(' ').map(Number);
    ary.push(floca([dir, loca]));
}
const [dr, dc, ddir] = floca(input[N].split(' ').map(Number));

for (shop of ary) {
    const [r, c, dir] = shop;
    if (Math.floor(ddir / 2) != Math.floor(dir / 2))
        ans += Math.abs(r - dr) + Math.abs(c - dc);
    else {
        if (dir == ddir) {
            ans += Math.abs(r - dr) + Math.abs(c - dc);
            continue;
        }
        if (dir == 0 || dir == 1) 
            ans += Math.min(R + c + dc, R + 2 * C - c - dc)
        if (dir == 2 || dir == 3)
            ans += Math.min(C + r + dr, C + 2 * R - r - dr) 
    }
}

console.log(ans)
function floca([dir, loca]) {
    if (dir == 1) {
        return [0, loca, 0]
    }
    if (dir == 2){
        return [R, loca, 1]
    }
    if (dir == 3){
        return [loca, 0, 2]
    }
    if (dir == 4){
        return [loca, C, 3]
    }
}