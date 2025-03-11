const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const N = Number(input.shift())
const balls = input.shift().split('').map((e) => {
    if (e === 'R') return 0;
    return 1;
})
let ans = Infinity

moveLeft(1)
moveLeft(0)
moveRight(1)
moveRight(0)
console.log(ans)

// left로 t를 모은다.
function moveLeft(t) {
    let cnt = 0;
    let seq = balls[0] == t ? true : false

    for (let i = 1; i < balls.length; ++i) {
        if (balls[i] != t) {
            seq = false;
            continue;
        }
        if (seq) continue;
        ++cnt;
    }
    ans = Math.min(cnt, ans)
}

//right로 t를 모은다.
function moveRight(t) {
    let cnt = 0;
    let seq = balls[balls.length - 1] == t ? true : false;

    for (let i = balls.length - 2; i >= 0; --i) {
        if (balls[i] != t) {
            seq = false;
            continue;
        }
        if (seq) continue;
        ++cnt;
    }
    ans = Math.min(cnt, ans)
}