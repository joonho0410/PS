const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const N = Number(input.shift())
const peoples = []

for (let i = 0; i < N; ++i) {
    peoples.push(Number(input[i]))
}

solve();

function solve() {
    let ans = 0n
    const map = new Map();
    map.set(peoples[0], 1)
    
    const stack = [peoples[0]]

    for (let i = 1; i < peoples.length; ++i) {
        const cur = peoples[i]

        if (stack[stack.length - 1] <= cur) {
            while (stack.length > 0) {
                if (stack[stack.length - 1] >= cur) break;
                map.delete(stack.pop());
                ans += 1n;
            }
            if (!map.has(cur)) map.set(cur, 0)
            ans += BigInt(map.get(cur))
            map.set(cur, map.get(cur) + 1)
            if (map.size > 1) ans += 1n
            stack.push(cur);
            continue;
        }

        map.set(cur, 1);
        ans += 1n;
        stack.push(cur)
    }

    console.log(String(ans))
}
