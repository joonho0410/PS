const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const T = Number(input.shift())
const isPrime = Array(10001).fill(true)

for (let i = 2; i <= 10000; ++i) {
    if (!isPrime[i]) continue;
    for (let j = 2; j * i <= 10000; ++j) isPrime[j * i] = false; 
}

const primes = new Set();

for (let i = 2; i <= 10000; ++i) {
    if (isPrime[i]) primes.add(i)
}

for (let i = 0; i < input.length; ++i) {
    let ans = [-Infinity, -Infinity];
    const n = Number(input[i])
    for (prime of primes) {
        const t = n - prime;
        if (!primes.has(t)) continue;
        let small = prime < t ? prime : t;
        if (ans[0] < small) ans = [small, n - small]
    }
    console.log(ans.join(' '))
}