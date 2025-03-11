const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [a, b] = input.shift().split(' ').map(Number)
const isPrime = Array(10001).fill(true)
const elems = []
let minMulti = b / a;

for (let i = 2; i <= 10000; ++i) {
    if (!isPrime[i]) continue;
    for (let j = i * 2; j <= 10000; j += i)
        isPrime[j] = false; 
}

for (let i = 2; i <= 10000; ++i) {
    if (!isPrime[i]) continue;
    let n = 1;
    while (minMulti % i === 0) {
        n *= i;
        minMulti /= i;
    }
    if (n !== 1) elems.push(n)
}
elems.push(minMulti);

const temp = b / a;
let ans = [];
let min = Infinity

recur(0, 1);
console.log(ans.sort((a, b) => a - b).join(' '))

function recur(idx, sum) {
    if (idx === elems.length) {
        const sum2 = temp / sum;
        if (sum + sum2 < min) {
            ans = [sum * a, sum2 * a]
            min = sum + sum2;
        }                
        return ;
    }
    recur(idx + 1, sum)
    recur(idx + 1, sum * elems[idx])
}