const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const N = Number(input.shift())
const set = new Set()

for (let i = 0; i < input.length; ++i) {
    const words = input[i].split(' ')
    let f = false;
    let ans = []
    
    // 첫 글자 검사
    for (word of words) {
        if (set.has(word[0].toUpperCase()) || f) {
            ans.push(word)
            continue;
        }
        f = true;
        set.add(word[0].toUpperCase())
        ans.push('[' + word[0] + ']' + word.slice(1))
    }
    if (f) {
        console.log(ans.join(' '))
        continue;
    }

    for (let j = 0; j < ans.length; ++j) {
        for (let i = 0; i < ans[j].length; ++i) {
            if (set.has(ans[j][i].toUpperCase())) continue;
            set.add(ans[j][i].toUpperCase())
            ans[j] = ans[j].slice(0, i) + '[' + ans[j][i] + ']' + ans[j].slice(i + 1);
            f = true; break;        
        }
        if (f) break;
    }
    console.log( ans.join(' '))
}