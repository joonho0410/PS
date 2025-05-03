const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [R, C] = input.shift().split(' ').map(Number)
const map = []
// Right, Left, UP, Down
const tiltDir = [[0, 1], [0, -1], [-1, 0], [1, 0]]


for (let i = 0; i < R; ++i) {
    map.push(input[i].split(''))
}

let ans = Infinity
solve();


function solve() {
    const [red, blue, goal] = findBallGoal()
    recur(red, blue, goal, 1);
    console.log(ans === Infinity ? -1 : ans)
}

function recur(red, blue, goal, cnt) {
    if (cnt === 11) return 0;
    const nexts = []

    for (let i = 0; i < 4; ++i) {
        const [nr, nb, goaled] = tilt(i, red, blue, goal)
        if (goaled === 0) {

            ans = Math.min(ans, cnt)
            return ;
        }
        if (goaled === 1) continue;
        if (nr && nb) nexts.push([nr, nb])
    }

    for ([nr, nb] of nexts) {
        recur(nr, nb, goal, cnt + 1);
    }
}

// 
function tilt(dir, red, blue, goal) {
    let [first, second] = [0, 0]
    if (dir === 0) [first, second] = red[1] < blue[1] ? [blue, red] : [red, blue]
    if (dir === 1) [first, second] = red[1] < blue[1] ? [red, blue] : [blue, red]
    if (dir === 2) [first, second] = red[0] < blue[0] ? [red, blue] : [blue, red]
    if (dir === 3) [first, second] = red[0] < blue[0] ? [blue, red] : [red, blue]

    const retFirst = moveBall(first, goal, dir)
    first = retFirst[0];

    const retSecond = moveBall(second, goal, dir, first[0], first[1])
    second = retSecond[0];
    
    if (retFirst[1] && retSecond[1]) return [null, null, 1];
    if (retFirst[1]) return [null, null, first[2]]
    if (retSecond[1]) return [null, null, second[2]]
    return first[2] === 0 ? [first, second, null] : [second, first, null];
}

function moveBall(ball, goal, dir, rr, rc) {
    const [dr, dc] = tiltDir[dir]
    let isGoal = false;

    while (1) {
        let [r, c, color] = ball;
        const [nr, nc] = [r + dr, c + dc]
        if (nr < 0 || nr >= R || nc < 0 || nc >= C) break;
        if (nr === rr &&  nc === rc) break;
        if (nr === goal[0] && nc === goal[1]) {
            ball = [null, null, color]
            isGoal = true;
            break;
        }
        if (map[nr][nc] === '#') break;
        ball = [nr, nc, color]
    }
    return [ball, isGoal]
}

function findBallGoal() {
    let rr, rc;
    let br, bc;
    let gr, gc;

    for (let r = 0; r < R; ++r) {
        for (let c = 0; c < C; ++c) {
            if (map[r][c] === 'R') [rr, rc] = [r, c]
            if (map[r][c] === 'B') [br, bc] = [r, c]
            if (map[r][c] === 'O') [gr, gc] = [r, c];
        }
    }

    return [[rr, rc, 0], [br, bc, 1], [gr, gc]]
}
