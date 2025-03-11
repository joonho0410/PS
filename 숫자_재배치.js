const fs = require('fs')
const input = fs.readFileSync(0).toString().split(' ')

const A = input.shift().split('')
const B = input.shift()

const isUsed = Array(A.length).fill(false)
let str = []
let ans = BigInt(-1);
for (let i = 0; i < isUsed.length; ++i) {
    if (A[i] === '0') continue;
    isUsed[i] = true;
    str.push(A[i])
    recur(1)
    str.pop();
    isUsed[i] = false;
}

console.log(String(ans))

function recur(cnt) {
    if (cnt === A.length) {
        const ret = BigInt(str.join(''))
        if (ret >= BigInt(B)) return;
        ans = ret > ans ? ret : ans
        return ;
    }

    for (let i = 0; i < isUsed.length; ++i) {
        if (isUsed[i]) continue;
        isUsed[i] = true;
        str.push(A[i])
        recur(cnt + 1)
        str.pop();
        isUsed[i] = false;
    }
}