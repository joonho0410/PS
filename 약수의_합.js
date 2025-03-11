const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const MAX = 1000000;
let T = Number(input.shift())
const isPrime = Array(1001).fill(true)
const f = Array(MAX + 1).fill(0)
const y = Array(MAX + 1).fill(0)
const primes = []

// init
f[1] = 1
y[1] = 1;

for (let i = 2; i <= 1000; ++i) {
    if (!isPrime[i]) continue;
    primes.push(i)
    for (let j = 2; i * j <= 1000; ++j) isPrime[i * j] = false;
}

for (let i = 2; i <= MAX; ++i) {
    let cpy = i;
    let minP = i;
    let compensate = 1;
    for (prime of primes) {
        if (i % prime !== 0) continue;
        minP = prime;
        break;
    }
    while (cpy % minP === 0) {
        compensate *= minP;
        cpy /= minP;
    }
    f[i] = f[i / minP] + f[cpy] * compensate
}

for (let i = 1; i <= MAX; ++i) {
    y[i] = y[i - 1] + f[i]
}

const ans = []
for (let i = 0; i < T; ++i) { 
    const N = Number(input[i])
    ans.push(y[N])
}

console.log(ans.join('\n'))