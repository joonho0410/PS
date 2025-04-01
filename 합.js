const { match } = require('assert');
const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const N = Number(input.shift())
const digits = Array(12).fill(1n);
for (let i = 1; i < digits.length; ++i) {
    digits[i] = digits[i - 1] * 10n;
}

const values = {}
const noZero = {}

const numbers = []
for (let i = 0; i < N; ++i) {
    const ary = input[i].split('').reverse()

    noZero[ary[ary.length - 1]] = true;
    for (let j = 0; j < ary.length; ++j) {
        const cur = ary[j]
        if (values[cur] === undefined) { values[cur] = 0n }
        values[cur] += digits[j];
    }
}

const ary = Object.entries(values).sort((a, b) => {
    if (a[1] - b[1] < 0n) return -1;
    if (a[1] === b[1]) return 0;
    return 1;
})

let answer = 0n;
const visited = Array(ary.length).fill(false)

for (let i = 10 - ary.length; i < 10; ++i) {
    for (let j = 0; j < ary.length; ++j) {
        const [char, val] = ary[j];

        if (visited[j]) continue;
        if (i === 0 && noZero[char]) continue;
        visited[j] = true;
        answer += val * BigInt(i);
        break;
    }
}

console.log(String(answer))
