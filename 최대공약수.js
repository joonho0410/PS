const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const N = Number(input.shift())
const aryA = input.shift().split(' ').map(BigInt)
const M = Number(input.shift())
const aryB = input.shift().split(' ').map(BigInt)

let curA = aryA[0]
for (let i = 1; i < aryA.length; ++i) {
    // let ret = findRet(curA, aryA[i])
    curA = curA * aryA[i]
}
let curB = aryB[0]
for (let i = 1; i < aryB.length; ++i) {
    // let ret = findRet(curB, aryB[i])
    curB = curB * aryB[i]
}

console.log(String(findRet(curA, curB)).slice(-9))

function findRet(a, b) {
    [a, b] = a < b ? [a, b] : [b, a]
    let mod = a % b;
    while (mod > 0) {
        a = b;
        b = mod;
        mod = a % b;        
    }
    return b;
}
