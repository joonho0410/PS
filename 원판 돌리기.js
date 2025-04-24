const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [N, M ,T] = input.shift().split(' ').map(Number)
let circle = Array.from({length : N + 2}, () => Array(M).fill(Infinity))
const commands = []

for (let i = 0; i < N; ++i ){
    circle[i + 1] = input[i].split(' ').map(Number)
}
input.splice(0, N)
for (let i = 0; i < T; ++i) {
    commands.push(input[i].split(' ').map(Number))
}

for (let [x, d, k] of commands) {
    // 회전 보정
    let rotateIdx = d === 0 ? -k : k;
    rotateIdx = rotateIdx < 0 ? rotateIdx % M + M : rotateIdx % M

    // 전체 원판 회전
    for (let i = x; i <= N; i += x) circle[i] = getRotatedCircle(i, rotateIdx)
    circle = update();
}

findAns();

function update() {
    const updatedCircle = Array.from({length : N + 2}, () => Array(M).fill(Infinity))
    let isUpdated = false

    for (let x = 1; x <= N; ++x) {
        currentCircle = circle[x]
        prevCircle = getRotatedCircle(x - 1, 0)
        nextCircle = getRotatedCircle(x + 1, 0)
    
        let updateCur = [...circle[x]]
    
        for (let i = 0; i < M; ++i) {
            // 현재가 Infinity 일 경우 무시
            if (currentCircle[i] === Infinity) continue;
    
            let currentNum = currentCircle[i]
    
            // 인접행렬 교환
            if (prevCircle[i] === currentNum) { updateCur[i] = Infinity; isUpdated = true }
            if (nextCircle[i] === currentNum) { updateCur[i] = Infinity; isUpdated = true }
            if (currentCircle[(i + 1) % M] === currentNum) { updateCur[i] = Infinity; isUpdated = true }
            if (currentCircle[(i - 1 + M) % M] === currentNum) { updateCur[i] = Infinity; isUpdated = true }
        }
    
        updatedCircle[x] = updateCur;
    }
    if (isUpdated) return updatedCircle

    let sum = 0;
    let cnt = 0;
    for (let i = 1; i <= N; ++i) {
        circle[i].forEach((e) => {
            if (e === Infinity) return ;
            ++cnt;
            sum += e;
        })
    }
    let avg = sum / cnt

    for (let i = 1; i <= N; ++i) {
        updatedCircle[i] = circle[i].map((e) => {
            if (e < avg) return e + 1;
            if (avg < e) return e - 1;
            return e
        })
    }
    return updatedCircle;
}

function findAns() {
    let ans = 0;
    for (let i = 1; i <= N; ++i) {
        const current = circle[i];
        current.forEach((e) => {
            if (e === Infinity) return ;
            ans += e
        })
    }
    console.log(ans)
}

function getRotatedCircle(x, idx) {
    const rotatedCircle = []
    for (let i = 0; i < M; ++i) {
        rotatedCircle.push(circle[x][(i + idx) % M])
    }

    return rotatedCircle
}
