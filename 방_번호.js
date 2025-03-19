const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const N = Number(input.shift())
const numbers = input.shift().split(' ').map(Number)
const M = Number(input.shift())

const sortByValue = numbers.map((val, idx) => [idx, val]).sort((a, b) => a[1] - b[1])
const sortByIndex = numbers.map((val, idx) => [idx, val])

if (numbers.length === 1) {console.log(0); return ;}
let money = M;
const ret = swapToMax(findMaxAry())
console.log(ret.join(''))

function findMaxAry() {
    let ary = []
    let head = sortByValue[0][0] === 0 ? sortByValue[1][1] : sortByValue[0][1]
    ary.push(sortByValue[0][0] === 0 ? sortByValue[1][0] : sortByValue[0][0])
    
    money -= head;
    if (money < 0 ) return [0]
    while (1) {
        if (money - sortByValue[0][1] < 0) break;
        money -= sortByValue[0][1]
        ary.push(sortByValue[0][0])
    }
    
    return ary;
}

function swapToMax(ary) {
    for (let i = 0; i < ary.length; ++i) {
        for (let j = ary[i] + 1; j < numbers.length; ++j) {
            const [curNum, curPrice] = sortByIndex[ary[i]];
            const [num, price] = sortByIndex[j];
            const dif = price - curPrice;
            if (money - dif < 0) continue;
            money -= dif;
            ary[i] = num;
        }
    }

    return ary;
}