const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const N = Number(input.shift())

solve();

function solve() {
    let ans = 1n;
    const primes = findPrime();
    const primesInN = groupOfPrimeN(BigInt(N), primes)
    
    for ([prime, cnt] of primesInN.entries()) {
        const oiler = pow(prime, cnt) - pow(prime, cnt - 1)
        ans *= oiler
    }
    console.log(String(ans))
}

function pow(a, n) {
    let power = BigInt(a)
    let ret = 1n;
    while (n--) {
        ret *= power;
    }
    
    return ret;
}

function findPrime() {
    const max = 1000001;
    const primes = []
    const isPrime = Array(1000001).fill(true)

    for (let i = 2; i < max; ++i) {
        if (!isPrime[i]) continue;
        primes.push(i)
        for (let j = i * i; j < max; j += i) isPrime[j] = false;
    }

    return primes;
}

function groupOfPrimeN (N, primes) {
    const primesInN = new Map();

    for (p of primes) {
        const prime = BigInt(p)
        if (prime > N) break;
        let cnt = 0;
        while (N % prime === 0n) {
            N /= prime;
            ++cnt;
        }
        if (cnt > 0) primesInN.set(p, cnt) 
    }
    
    if (N !== 1n) primesInN.set(N, 1)
    return primesInN
}
