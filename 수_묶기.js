const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n').map(Number)
input.shift()
let pos = input.filter((e) => e > 0)
let nega = input.filter((e) => e <= 0)
pos = pos.sort((a, b) => b - a)
nega = nega.sort((a, b) => a - b)

const ptie = Array(pos.length).fill(false)
const ntie = Array(nega.length).fill(false)

let ans = 0;
for (let i = 0; i < pos.length - 1; ++i) {
    if (ptie[i]) continue;
    if (pos[i] * pos[i + 1] > pos[i] + pos[i + 1]) {
        ptie[i] = true;
        ptie[i + 1] = true;
        ans += pos[i] * pos[i + 1];
    }
}
for (let i = 0; i < pos.length; ++i){
    if (!ptie[i]) ans += pos[i];
}
for (let i = 0; i < nega.length -1; ++i) {
    if (ntie[i]) continue;
    if (nega[i] * nega[i + 1] > nega[i] + nega[i + 1]) {
        ntie[i] = true;
        ntie[i + 1] = true;
        ans += nega[i] * nega[i + 1];
    }
}
for (let i = 0; i < nega.length; ++i){
    if (!ntie[i]) ans += nega[i];
}
console.log(ans)