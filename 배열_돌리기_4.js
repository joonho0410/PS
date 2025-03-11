const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [R, C, K] = input.shift().split(' ').map(Number)
const visit = Array(K).fill(false)
const ary = []
const rotate = []
const rotateS = []
let ans = Infinity;

for (let i = 0; i < R; ++i) {
    ary.push(input.shift().split(' ').map(Number))
}
for (let i = 0; i < K; ++i) {
    rotate.push(input[i].split(' ').map(Number))
}

recur();
console.log(ans)
function recur() {
    if (rotateS.length == rotate.length) {
        findAns();
        return 
    }

    for (let i = 0; i < rotate.length; ++i){
        if (visit[i]) continue;
        visit[i] = true;
        rotateS.push(rotate[i]);
        recur();
        rotateS.pop();
        visit[i] = false;
    }
}

function findAns() {
    const cpyAry = [...ary.map(e => [...e])]
    for (rot of rotateS) {
        const [r, c, s] = rot;
        let lr = r - s - 1;
        let lc = c - s - 1;
        let rr = r + s - 1;
        let rc = c + s - 1;
        while (lr != rr) {
            doRotation(cpyAry, lr, lc, rr, rc);
            lr += 1;
            lc += 1;
            rr -= 1;
            rc -= 1;
        }
    }
    ans = Math.min(ans, findSum(cpyAry))    
}

function doRotation(ary, lr, lc, rr, rc) {
    const newAry = Array.from({length : R }, () => Array(C).fill(0))
    for (let c = lc; c < rc; ++c) newAry[lr][c + 1] = ary[lr][c];
    for (let r = lr; r < rr; ++r) newAry[r + 1][rc] = ary[r][rc];
    for (let c = rc; c > lc; --c) newAry[rr][c - 1] = ary[rr][c];
    for (let r = rr; r > lr; --r) newAry[r - 1][lc] = ary[r][lc];

    for (let c = lc; c <= rc; ++c) {
        ary[lr][c] = newAry[lr][c];
        ary[rr][c] = newAry[rr][c];
    }
    for (let r = lr; r <= rr; ++r){
        ary[r][lc] = newAry[r][lc]
        ary[r][rc] = newAry[r][rc]
    }
}

function findSum(ary) {
    let min = Infinity

    for (let r = 0; r < R; ++r){
        let sum = 0;
        for (let c = 0; c < C; ++c){
            sum += ary[r][c];
        }
        min = Math.min(min, sum);
    }
    return min;
}