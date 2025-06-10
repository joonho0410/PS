const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [D, P, Q] = input.shift().split(' ').map(Number)
const [big, small] = P > Q ? [P, Q] : [Q, P]

solve()

function solve() {
    const max = Math.min(Math.ceil(D / big), small);
    
    let ans = Infinity
    for (let i = 0; i < max; ++i) {
        ans = Math.min(ans, (small - (D - big * i) % small) % small)
    }

    ans = Math.min(ans, (big - (D % big)) % big)
    console.log(D + ans)
}
