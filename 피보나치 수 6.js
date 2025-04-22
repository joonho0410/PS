const fs = require('fs')
const input = fs.readFileSync(0).toString().split('\n')

const N = BigInt(input.shift())
const div = 1000000007n

const cache = new Map();
cache.set(0n, 0n)
cache.set(1n, 1n)
cache.set(2n, 1n)

console.log(String(dq(N)))

function dq(n) {
    if (cache.has(n)) return cache.get(n);

    if (n % 2n === 0n) {
        let next = n / 2n;
        let ret = dq(next) * (dq(next + 1n) + dq(next - 1n))
        ret = ret % div;
        cache.set(n, ret)
        return ret;
    }
    else {
        let left = dq((n + 1n) / 2n)
        let right = dq((n - 1n) / 2n)
        ret = (left * left + right * right) % div
        cache.set(n, ret)
        return ret;
    }
}
