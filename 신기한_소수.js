const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const N = Number(input.shift())

let ans = []
let cur = 0;
findAns(0, 0);
console.log(ans.join('\n'))

function findAns(len) {
    if (len == N) { ans.push(cur); return; }
    for (let i = 0; i < 10; ++i){
        if (len == 0 && i == 0) continue;
        if (!checkPrime(cur * 10 + i)) continue;
        cur = cur * 10 + i;
        findAns(len + 1, cur * 10 + i);
        cur = Math.floor(cur / 10);
    }
}

function checkPrime(n) {
    if (n == 1) return false;
    let s = 0;
    let e = n;
    while (s <= e) {
        let mid = Math.floor((s + e) / 2);
        if (mid * mid > n) e = mid - 1;
        if (mid * mid < n) s = mid + 1;
        if (mid * mid == n) {e = mid; break;}
    }

    for (let i = 2; i <= e; ++i) {
        if (n % i == 0) return false;
    }

    return true;
}