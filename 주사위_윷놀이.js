const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const dice = input.shift().split(' ').map(Number)
const sym = [Symbol(10), Symbol(20), Symbol(30)]
const main = []
const last = [Symbol(25), Symbol(30), Symbol(35), Symbol(40)]
const r10 = [sym[0], Symbol(13), Symbol(16), Symbol(19), ...last]
const r20 = [sym[1], Symbol(22), Symbol(24), ...last]
const r30 = [sym[2], Symbol(28), Symbol(27), Symbol(26), ...last]
const r40 = [last[last.length - 1]]
const finish =Symbol('finish')
const roads = [main, r10, r20, r30, r40]
let ans = 0;

for (let i = 0; i < 20; ++i) {
    if ((i * 2) % 10 != 0)
        main.push(Symbol(i * 2))
    else
        main.push(sym[i * 2 / 10 - 1])
}
main.push(last[last.length - 1])

recur(0, [[main, 0], [main, 0], [main, 0], [main, 0]], 0)
console.log(ans)

function recur(diceIdx, loca, sum) {
    if (diceIdx === 10) {
        ans = Math.max(ans, sum)
        return ;
    }
    const cnt = dice[diceIdx];

    for (let i = 0; i < 4; ++i) {
        const next = []
        const [curRoad, curIdx] = loca[i]
        const nextIdx = curIdx + cnt;
        for (e of loca) next.push([...e])

        if (curRoad === finish) continue;
        if (nextIdx >= curRoad.length) {
            next[i] = [finish, 0]
            recur(diceIdx + 1, next, sum)
            continue;
        }

        if (curRoad == main && Number(main[nextIdx].description) % 10 === 0) {
            const nextRoad = roads[Number(main[nextIdx].description) / 10]
            if (isDup(loca, main[nextIdx])) continue;
            next[i] = [nextRoad, 0]
            recur(diceIdx + 1, next, sum + Number(main[nextIdx].description))
            continue;
        }
        if (isDup(loca, curRoad[nextIdx])) continue;
        next[i] = [curRoad, nextIdx];
        recur(diceIdx + 1, next, sum + Number(curRoad[nextIdx].description))
    }
}

function isDup(loca, next) {
    for (e of loca) {
        const [road, idx] = e;
        if (road[idx] === next) return true;
    }
    return false;
}