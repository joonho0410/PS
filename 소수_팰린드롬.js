const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
let N = Number(input.shift())
const isPrime = Array(2000001).fill(true);

isPrime[0] = false;
isPrime[1] = false;
for (let i = 2; i < 2000; ++i){
    if (isPrime[i]) {
        for (let j = i; j * i <= 2000000; ++j)
            isPrime[j * i] = false;
    }
}

while (1) {
    if (!isPrime[N]) { ++N; continue;}
    if (isPel(String(N).split(''))) break;
    ++N;
}

console.log (N)
function isPel (n) {
    if (n.length % 2 == 0) {
        const mid = n.length / 2;
        let first = n.slice(0, mid);
        let second = n.slice(mid, n.length)
        second = second.reverse()
        for (let i = 0; i < first.length; ++i) {
            if (first[i] != second[i]) return false;
        }
    }
    if (n.length % 2 == 1) {
        const mid = Math.floor(n.length / 2)
        let first = n.slice(0, mid);
        let second = n.slice(mid + 1, n.length)
        second = second.reverse()
        for (let i = 0; i < first.length; ++i)
            if (first[i] != second[i]) return false;
    }
    return true;
}