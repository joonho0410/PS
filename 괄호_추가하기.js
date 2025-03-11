const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const N = Number(input.shift())
const S = input.shift().split('')

const numbers = []
const op = []

for (let i = 0; i < S.length; ++i) {
    const cur = S[i];
    if (cur === '+' || cur === '-' || cur === '*') op.push(cur)
    else numbers.push(Number(cur))
}

let ans = -Infinity ;
recur(1, 0, numbers[0])
console.log(ans)

function recur(nidx, opidx, sum) {
    if (nidx == numbers.length) {
        ans = Math.max(ans, sum)
        return ;
    }

    if (nidx + 1 < numbers.length) {
        const a = numbers[nidx]
        const b = numbers[nidx + 1]
        const op1 = op[opidx + 1]
        const ret = operate(op1, a, b);
        const op2 = op[opidx];
        const ret2 = operate(op2, sum, ret)
        if (ret2 < 2 ** 31) recur(nidx + 2, opidx + 2, ret2);
    }
    const op1 = op[opidx];
    const ret = operate(op1, sum, numbers[nidx])
    if (ret < 2 ** 31) recur(nidx + 1, opidx + 1, operate(op1, sum, numbers[nidx]))
}

function operate(oper, a, b) {
    let ret = 0;
    if (oper === '+') ret = a + b;
    if (oper === '-') ret = a - b;
    if (oper === '*') ret = a * b;
    return ret;
}