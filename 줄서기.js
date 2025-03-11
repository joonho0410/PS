const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const N = Number(input.shift())
const ary = []
const stack = []

for (let i = 0; i < N ; ++i) {
    ary.push(...input[i].split(' '))
}

const right = [...ary].sort((a, b) => {
    const [c1, n1] = a.split('-')
    const [c2, n2] = b.split('-')
    if (c1 !== c2) return c1 < c2 ? -1 : 1;
    return Number(n1) - Number(n2)
}).reverse()

for (ticket of ary) {
    const last = right[right.length - 1]
    let correct = ticket === last
    if (correct) right.pop();
    while (1) {
        if (stack.length === 0) break;
        const s = stack[stack.length - 1]
        const l = right[right.length - 1]
        if (s !== l) break;
        stack.pop();
        right.pop();
    }
    if (!correct) stack.push(ticket)
}

while (1) {
    if (stack.length === 0) break;
    const s = stack[stack.length - 1]
    const l = right[right.length - 1]
    if (s !== l) break;
    stack.pop();
    right.pop();
}

right.length === 0 ? console.log('GOOD') : console.log('BAD')