const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const N = Number(input.shift())
const switches = input.shift().split(' ').map(Number)
const bulbs = input.shift().split(' ').map(Number)

const map = new Map();
const switchMap = new Map()
const ary = []
const ans = []

for (let i = 0; i < bulbs.length; ++i) {
    map.set(bulbs[i], i)
}

for (let i = 0; i < switches.length; ++i) {
    ary.push(map.get(switches[i]))
    switchMap.set(i, switches[i])
}

ans.push([ary[0], [0]])

for (let i = 1; i < ary.length; ++i) {
    const idx = bisect(ary[i])
    if (idx >= ans.length) ans.push([ary[i], [i]])
    else ans[idx] = [ary[i], [...ans[idx][1], i]]

}

console.log(ans.length)

let curidx = Infinity
let temp = []
while (ans.length > 0) {
    const [a, idxAry] = ans.pop();
    for (let i = idxAry.length - 1; i >= 0; --i) {
        if (curidx <= idxAry[i]) continue;
        curidx = idxAry[i]
        temp.push(switchMap.get(curidx))
        break; 
    }
}

console.log(temp.sort().join(' '))
//upperbound
function bisect(val){
    let s = 0;
    let e = ans.length - 1;

    while (s <= e) {
        let mid = Math.floor((s + e) / 2)
        if (val <= ans[mid][0]) e = mid - 1;
        else s = mid + 1; 
    }

    return s;
}
