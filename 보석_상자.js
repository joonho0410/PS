const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [N, M] = input.shift().split(' ').map(Number)
const jews = input.map(Number)

console.log(bisecet());

function bisecet() {
    let s = 1;
    let e = 1000000000;

    while (s <= e){
        let mid = Math.floor((s + e) / 2)
        let p = 0;
        for (jew of jews) {
            const mod = jew % mid;
            const val = mod === 0 ? jew / mid : Math.floor(jew / mid) + 1
            p += val;
        }

        if (p > N) s = mid + 1;
        if (p <= N) e = mid - 1;
    }
    return s;
}