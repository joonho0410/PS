const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

for (let i = 0; i < input.length; ++i) {
    const ary = input[i].split(' ').map(Number)
    if (ary[0] === 0) break;

    const N = ary[0]
    const lottos = ary.slice(1)
    const ans = []
    
    const seq = []
    combi(0)
    function combi (idx) {
        if (seq.length === 6) {
            ans.push(seq.join(' '))        
            return ;
        }
        if (idx >= lottos.length) return ;

        seq.push(lottos[idx])
        combi(idx + 1);
        seq.pop();
        combi(idx + 1)
    }
    console.log(ans.join('\n'))
    console.log('')
}