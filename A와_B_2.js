const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

let S = input.shift().split('')
let T = input.shift().split('')

let ans = false;

function bt() {
    if (ans) return ;

    if (S.length === T.length) {
        if (S.join('') === T.join('')) ans = true;
        return ;
    }

    const front = T[0];
    const back = T[T.length - 1]

    if (back === 'A') deleteA()
    if (front === 'B') deleteB()
}

bt();
console.log(ans ? 1 : 0)

function deleteA () {
    T.pop();
    bt();
    T.push('A')
}

function deleteB () {
    T = T.reverse();
    T.pop();
    bt();
    T.push('B')
    T = T.reverse()
}