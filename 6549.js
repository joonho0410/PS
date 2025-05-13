const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

for (let i = 0; i < input.length; ++i) {
    const ary = input[i].split(' ').map(BigInt).slice(1);
    if (ary.length === 0) break;

    solve(ary);
}

function solve(ary) {
    const blocks = ary.map((v, idx) => [v, idx + 1])

    console.log(findMax(blocks))
}

function findMax(blocks) {
    let ans = 0n;
    let stack = [[0n, 0]]

    for (let i = 0; i < blocks.length; ++i) {
        let width = 0n;
        while (stack.length > 0 && stack[stack.length - 1][0] > blocks[i][0]) {
            const [topVal, topIdx] = stack.pop();
            const [bVal, bIdx] = stack[stack.length - 1];
            width += BigInt(topIdx - bIdx)
     
            const area = topVal * width
            ans = ans < area ? area : ans
        }
        stack.push(blocks[i])
    }
    let width = 0n;
    while (stack.length > 0) {
        const [topVal, topIdx] = stack.pop();
        if (stack.length === 0) break;
        const [bVal, bIdx] = stack[stack.length - 1];
        width += BigInt(topIdx - bIdx)
 
        const area = topVal * width
        ans = ans < area ? area : ans
    }
    return String(ans);
}
