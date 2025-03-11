const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n').map(Number)
const T = input.shift();
const ans = ['1']
let N = 0;
const answers = Array.from({length : 10} , () => []);

for (let i = 3; i < 10; ++i) {
    N = i;
    bf(2);
    answers[i].sort()
}
for (let i = 0; i < input.length; ++i) {
    if (!answers[input[i]].length) continue;

    console.log(answers[input[i]].join('\n'))
    console.log("")
}

function bf(cnt) {
    if (cnt === N + 1) {
        let temp = ans.join('').replaceAll(' ', '');
        if (cal(temp)) answers[N].push(ans.join(''))
        return ;
    }

    // +
    ans.push(`+${cnt}`)
    bf(cnt + 1)
    ans.pop();
    // -
    ans.push(`-${cnt}`)
    bf(cnt + 1)
    ans.pop()
    // 공백
    ans.push(` ${cnt}`)
    bf(cnt + 1);
    ans.pop();
}

function cal(str) {
    const numbers = str.split(/[+-]/).map(Number)
    const cal = []
    str = str.split('')
    for (let i = 0; i < str.length; ++i) {
        if (str[i] === '+' || str[i] === '-') cal.push(str[i]) 
    }
    numbers.reverse();
    cal.reverse();
    while (cal.length) {
        const top = numbers.pop();
        const second = numbers.pop();
        const calc = cal.pop();

        if (calc === '+') numbers.push(top + second);
        else numbers.push(top - second);
    }
    ret = numbers.pop();
    if (ret === 0) return true;
    return false;
}