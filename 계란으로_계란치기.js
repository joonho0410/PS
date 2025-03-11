const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split("\n")

const N = Number(input.shift())
const eggs = input.map((e) => e.split(' ').map(Number)) // [내구도, 무게]
let ans = 0;

bt(0);
console.log(ans)

function bt(idx) {
    let br = false;

    if (idx === N) {
        ans = Math.max(ans, eggs.filter((e) => e[0] <= 0).length) 
        return; 
    }
    if (eggs[idx][0] <= 0) {
        bt(idx + 1)
        return ;
    }

    for (let i = 0; i < N; ++i) {
        if (i === idx || eggs[i][0] <= 0) continue;
        eggs[i][0] -= eggs[idx][1];
        eggs[idx][0] -= eggs[i][1];
        bt(idx + 1);
        eggs[i][0] += eggs[idx][1];
        eggs[idx][0] += eggs[i][1];
        br = true;
    }
    if (!br) bt(idx + 1)
}