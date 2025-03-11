const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
let N = Number(input.shift())

const isPrime = Array(1000001).fill(true)
isPrime[0] = isPrime[1] = false;

for (let i = 2; i <= 1000000; ++i) {
    if (!isPrime[i]) continue;
    for (let j = 2; i * j <= 1000000; ++j) {
        isPrime[i * j] = false;
    }
}

let cnt = 0;

for (let i = 2; i <= 1000000; ++i) {
    if (!isPrime[i]) continue;
    const cur = i;
    while (1) {
        if (N % i != 0) break;
        ++cnt;
        N /= i;
    }    
}

let ans = 1;
if (cnt === 1) console.log(0)
else {
    while (1) {
        if (Math.pow(2, ans - 1) < cnt && cnt <= Math.pow(2, ans)) break;
        ++ans;
    }
    console.log(ans)
}