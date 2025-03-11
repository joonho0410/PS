const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [D, K] = input.shift().split(' ').map(Number)

const fib = Array.from({length : 31}, () => {return {a: 0, b: 0}});
fib[1] = {a: 1, b : 0}
fib[2] = {a: 0, b : 1}

for (let i = 3; i <= 30; ++i) {
    fib[i].a = fib[i - 1].a + fib[i - 2].a
    fib[i].b = fib[i - 1].b + fib[i - 2].b
}

const {a, b} = fib[D]
let [A, B] = [0, 0]

for (let i = 1; i <= 50000; ++i) {
    if ((K - (a * i)) % b !== 0) continue;
    [A, B] = [i, (K - (a * i)) / b]
    break;
}

console.log([A, B].join('\n'))