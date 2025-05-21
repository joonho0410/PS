const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const N = Number(input.shift())
const W = Number(input.shift())
const cases = [[0, 0]]

for (let i = 0; i < W; ++i) {
    const [r, c] = input[i].split(' ').map(Number)
    cases.push([r - 1, c - 1]) // 0-index
}

solve();

function solve() {
    const dp = Array.from({length: W + 1}, () => Array(W + 1).fill(Infinity))
    const bt = Array.from({length: W + 1}, () => Array(W + 1).fill([0, 0]))
    dp[0][0] = 0;
    dp[0][1] = calDis([N - 1, N - 1], cases[1]);
    dp[1][0] = calDis([0, 0], cases[1])

    for (let caseNum = 2; caseNum <= W; ++caseNum){
        for (let k = 0; k < caseNum - 1; ++k) {
            // 2번차가 도착하는 경우
            const c1 = dp[k][caseNum - 1] + calDis(cases[caseNum - 1], cases[caseNum])
            const c2 = dp[caseNum - 1][k] + calDis(k !== 0 ? cases[k] : [N - 1, N - 1], cases[caseNum])

            // 1번차가 도착하는 경우
            const c3 = dp[caseNum - 1][k] + calDis(cases[caseNum - 1], cases[caseNum])
            const c4 = dp[k][caseNum - 1] + calDis(cases[k], cases[caseNum])
            
            if (c1 < dp[k][caseNum]) { dp[k][caseNum] = c1; bt[k][caseNum] = [k, caseNum - 1] }
            if (c2 < dp[caseNum - 1][caseNum]) { dp[caseNum - 1][caseNum] = c2; bt[caseNum - 1][caseNum] = [caseNum - 1, k] }
            if (c3 < dp[caseNum][k]) { dp[caseNum][k] = c3; bt[caseNum][k] = [caseNum - 1, k] }
            if (c4 < dp[caseNum][caseNum - 1]) { dp[caseNum][caseNum - 1] = c4; bt[caseNum][caseNum - 1] = [k, caseNum - 1] }
        }
    }

    let [c1, c2, sum] = findMin(dp)
    let caseNum = W;
    let ans = []
    while (caseNum) {
        if (c1 === caseNum) ans.push(1)
        if (c2 === caseNum) ans.push(2)
        let [t1, t2] = bt[c1][c2]
        c1 = t1;
        c2 = t2;
        --caseNum
    }
    console.log(sum)
    console.log(ans.reverse().join('\n'))
}

function findMin(dp) {
    let min = Infinity
    let car1 = 0;
    let car2 = 0;

    for (let i = 0; i < W; ++i) {
        if (dp[i][W] < min) { min = dp[i][W]; car1 = i; car2 = W; } 
        if (dp[W][i] < min) { min = dp[W][i]; car1 = W; car2 = i; }
    }
    return [car1, car2, min]
}

function calDis(a, b) {
    const [x1, y1] = a
    const [x2, y2] = b

    return Math.abs(x1 - x2) + Math.abs(y1 - y2)
}
