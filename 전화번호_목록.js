const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

let T = Number(input.shift())

while (T--) {
    let N = Number(input.shift());
    const ary = input.slice(0, N);
    const set = new Set();
    let same = false;
    for (e of ary) {
        set.add(e);
    }
    for (e of ary) {
        const temp = e.split('');
        let str = ''
        for (let i = 0; i < e.length -1; ++i) {
            str += temp[i];
            if (!set.has(str)) continue;
            same = true;
            break;
        }
        if (same) break;
    }
    
    same ? console.log("NO") : console.log("YES")
    input.splice(0, N);
}