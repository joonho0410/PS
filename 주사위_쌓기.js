const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const N = Number(input.shift())
const opposite = [5, 3, 4, 1, 2, 0];
const dices = []
let ans = 0;

for (let i = 0; i < N; ++i) {
    dices.push(input[i].split(' ').map(Number))
}

for (let i = 0; i < 6; ++i) {
    const temp = dices[0].filter((_, idx) => (idx !== i && idx !== opposite[i]))
    recur(dices[0][opposite[i]], 1, Math.max(...temp));
}

console.log(ans) ;

function recur(num, diceCnt, sum) {
    if (diceCnt == dices.length) {
        ans = Math.max(ans, sum);
        return ;
    }
    let bottomIdx;
    for (let i = 0; i < dices[diceCnt].length; ++i) {
        if (dices[diceCnt][i] !== num) continue;
        bottomIdx = i;
        break; 
    }
    const temp = dices[diceCnt].filter((_,idx) => (idx !== bottomIdx && idx !== opposite[bottomIdx]))
    recur(dices[diceCnt][opposite[bottomIdx]], diceCnt + 1, sum + Math.max(...temp))
} 