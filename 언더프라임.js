const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const isPrime = Array(100001).fill(true)
const [A, B] = input.shift().split(' ').map(Number)
const primes = []
let ans = 0;

isPrime[0] = false;
isPrime[1] = false; 

for (let i = 2; i <= 100000; ++i) {
    if (!isPrime[i]) continue;
    primes.push(i);
    for (let j = 2; i * j <= 100000; ++j)
        isPrime[i * j] = false;
}

for (let i = A; i <= B; ++i) {
    let cnt = 0;
    let cur = i;

    for (prime of primes) {
        if (prime > i) break;
        while (cur % prime === 0) {
            cur /= prime;
            ++cnt;
        }
    }
    if (isPrime[cnt]) ++ans
}

console.log(ans)