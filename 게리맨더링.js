const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const N = Number(input.shift())
const p = [0, ...input.shift().split(' ').map(Number)];
const dis = Array.from({length: N + 1}, () => Array(N + 1).fill(1000))
const isGroupA = Array(N + 1).fill(false);
let ans = Infinity;

for (let i = 0; i < input.length; ++i) {
    const ary = input[i].split(' ').map(Number);
    for (let j = 1; j < ary.length; ++j){
        dis[i + 1][ary[j]] = 1;
    }    
}

solve();

function solve() {
    for (let i = 1; i <= N - 1; ++i) {
        recur(i, 1, 0);
    }
    ans == Infinity ? console.log(-1) : console.log(ans);
}

function recur(target, idx, cur) {
    if (cur === target) {
        findAns();
        return ;
    }
    if (idx > N) return;
    isGroupA[idx] = true;
    recur(target, idx + 1, cur + 1);
    isGroupA[idx] = false;
    recur(target, idx + 1, cur); 
}

function findAns() {
    const groupA = [];
    const groupB = [];
    for (let i = 1; i <= N; ++i){
        if (isGroupA[i]) groupA.push(i);
        else groupB.push(i);
    }
    const a = floyd(groupA)
    const b = floyd(groupB)
    if (a === null || b === null) return ;
    ans = Math.min(Math.abs(a - b), ans);
}

function floyd(ary) {
    const dist = Array.from({length : N + 1}, () => Array(N + 1).fill(1000));
    const isAry = Array(N + 1).fill(false)
    let sum = 0;
    for (e of ary) {
        isAry[e] = true;
        sum += p[e];
    }
    for (e of ary) {
        for (let i = 1; i <= N; ++i) {
            if (isAry[i]) dist[e][i] = dis[e][i]; 
        }
    }
    
    for (let m = 1; m <= N; ++m){
        for (let s = 1; s <= N; ++s){
            for (let e = 1; e <= N; ++e){
                if (dist[s][e] > dist[s][m] + dist[m][e])
                    dist[s][e] = dist[s][m] + dist[m][e];
            }
        }
    }
    for (let i = 1; i <= N; ++i){
        for (let j = 1; j <= N; ++j){
            if (i != j && isAry[i] && isAry[j] && dist[i][j] == 1000) return null
        }
    }
    return sum;
}
