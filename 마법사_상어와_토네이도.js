const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const N = Number(input.shift())
const map = []
// left
const dr1 = [-2, -1, -1, -1, 0, 1, 1, 1, 2]
const dc1 = [0, -1, 0, 1, -2, -1, 0, 1, 0]
const leftMove = [dr1, dc1]

// up
const dr2 = [-2, -1, -1, 0, 0, 0, 0, 1, 1]
const dc2 = [0,-1, 1, -2, -1, 1, 2, -1, 1] 
const upMove = [dr2, dc2]

// left, up
const dp1 = [2, 10, 7, 1, 5, 10, 7, 1, 2]
const dp2 = [5, 10, 10, 2, 7, 7, 2, 1, 1]

// left, down, right, up
const dir = [[leftMove, 1], [upMove, -1], [leftMove, -1], [upMove, 1]]
const calMove = [[0, -1], [1, 0], [0, 1], [-1, 0]]
let ans = 0;

let curdir = 0;
let changeScalar = false;
let scalar = 1;
let [destR, destC] = [Math.floor(N / 2), Math.floor(N / 2) - 1]
for (let i = 0; i < N; ++i) {
    map.push(input[i].split(' ').map(Number))
}

let [r, c] = [ Math.floor(N / 2), Math.floor(N / 2) - 1 ]

tornado();

function tornado() {    
    while (1) {
        let movedSand = 0;
        const [move, sign] = dir[curdir]
        const [dr, dc] = move;
        const dp = curdir % 2 === 0 ? dp1 : dp2
    
        for (let i = 0; i < dr.length; ++i) {
            const nr = r + (dr[i] * sign)
            const nc = c + (dc[i] * sign)
            const curMovedSand = Math.floor(map[r][c] * dp[i] / 100)
            movedSand += curMovedSand

            if (nr < 0 || nc < 0 || nr >= N || nc >= N) {
                ans += curMovedSand
                continue;
            }
            map[nr][nc] += curMovedSand;
        }

        const remainSand = map[r][c] - movedSand
        map[r][c] = 0;

        const nr = r + calMove[curdir][0]
        const nc = c + calMove[curdir][1]
        if (nr < 0 || nc < 0 || nr >= N || nc >= N) ans += remainSand
        else map[nr][nc] += remainSand
        
        if (r === 0 && c === 0) return;
        if (r == destR && c == destC) {
            if (changeScalar) { changeScalar = false; scalar += 1 }
            else { changeScalar = true } ;
            curdir = ( curdir + 1) % 4;
            destR = r + calMove[curdir][0] * scalar
            destC = c + calMove[curdir][1] * scalar
        }
        r = r + calMove[curdir][0]
        c = c + calMove[curdir][1]
    }
}
console.log(ans);