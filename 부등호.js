const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const N = Number(input.shift())
const op = input.shift().split(' ')
const visit = Array(10).fill(false)

let min = []
let max = []
let temp = []

recur(0)
console.log(max.join(''))
console.log(min.join(''))
function recur() {
    if (temp.length === N + 1) {
        if (!check()) return ;
        if (min.length === 0)
            min = [...temp]
        else
            max = [...temp]
        return ;
    }
    for (let i = 0; i < 10; ++i){
        if (visit[i]) continue;
        visit[i] = true;
        temp.push(i);
        recur()
        temp.pop();
        visit[i] = false;
    }
}

function check() {
    for (let i = 0; i < temp.length - 1; ++i) {
        if (op[i] == '<' && temp[i] >= temp[i + 1])
            return false;
        if (op[i] == '>' && temp[i] <= temp[i + 1])
            return false;
    }
    return true;
}