const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const N = Number(input.shift())

solve();

function solve() {
    const colorGroup = sortColorGroup();
    const totalGroup = sortTotalGroup();
    const [ psum, totalPsum ] = calcPsum(colorGroup, totalGroup);
    const balls = input;

    let ans = []
    for (ball of balls) {
        const [color ,size] = ball.split(' ').map(Number)
        const idx = bisect(size, colorGroup[color])
        const tIdx = bisect(size, totalGroup)

        // console.log(idx, tIdx)
        const targetSum = idx < 0 ? 0 : psum[color][idx]
        const totalSum = tIdx < 0 ? 0 : totalPsum[tIdx]
        ans.push(totalSum - targetSum)
    } 
    console.log(ans.join('\n'))
}

function bisect(target, group) {
    let s = 0;
    let e = group.length - 1;

    while (s <= e) {
        const mid = Math.floor((s + e) / 2)
        
        if (target <= group[mid]) e = mid - 1;
        else s = mid + 1
    }
    
    return e;
}

function sortTotalGroup() {
    const totalGroup = []
    
    for (let i = 0; i < N; ++i) {
        const [color, size] = input[i].split(' ').map(Number)
        totalGroup.push(size)
    }

    totalGroup.sort((a, b) => a - b)

    return totalGroup;
}

function sortColorGroup() {
    const colorGroup = Array.from({length : N + 1}, () => [])

    for (let i = 0; i < N; ++i) {
        const [color, size] = input[i].split(' ').map(Number)
        colorGroup[color].push(size)
    }

    colorGroup.forEach((e) => e.sort((a, b) => a - b))
    
    return colorGroup
}

function calcPsum(colorGroup, totalGroup) {
    const psum = Array(N + 1)
    const totalPsum = []

    // color Psum
    for (let i = 1; i <= N; ++i) {
        const group = colorGroup[i]
        let sum = 0;
        psum[i] = [] 

        for (element of group) {
            sum += element;
            psum[i].push(sum)
        }
    }

    let sum = 0;
    for (element of totalGroup) {
        sum += element;
        totalPsum.push(sum)
    }

    // total Psum

    return [psum, totalPsum];
}
