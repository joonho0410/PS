const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const [N, Q] = input.shift().split(' ').map(Number)
const mapLength = Math.pow(2, N)
let map = []

for (let i = 0; i < mapLength; ++i) {
    map.push(input[i].split(' ').map(Number))
}

const spells = input[mapLength].split(' ').map(Number)
solve();

function solve() {
    for (spell of spells) {
        splitMap(Math.pow(2, spell))
    }

    let total = 0;
    for (let r = 0; r < mapLength; ++r) {
        for (let c = 0; c < mapLength; ++c) {
            if (map[r][c] > 0) total += map[r][c]
        }
    }
    console.log(total)
    console.log(searchLagest())
}

function splitMap(len) {
    let rotatedMap = Array.from({length : mapLength}, () => Array(mapLength).fill(0))
    
    for (let r = 0; r < mapLength; r += len) {
        for (let c = 0; c < mapLength; c += len) {
            rotateMap(r, c, len, rotatedMap)
        }
    }

    map = updateMap(rotatedMap)
}

function rotateMap(sr, sc, len, rotatedMap) {
    for (let r = 0; r < len; ++r) {
        for (let c = 0; c < len; ++c) {
            rotatedMap[sr + c][sc + len - 1 - r] = map[sr + r][sc + c]
        }
    }
}

function updateMap(rotatedMap) {
    let updatedMap = Array.from({length : mapLength}, () => Array(mapLength).fill(0))
    const dr = [0, 0, 1, -1]
    const dc = [1, -1, 0, 0]

    for (let r = 0; r < mapLength; ++r){
        for (let c = 0; c < mapLength; ++c){
            let cnt = 0;
            for (let i = 0; i < 4; ++i) {
                const nr = r + dr[i]
                const nc = c + dc[i]
                if (nr < 0 || nr >= mapLength || nc < 0 || nc >= mapLength) continue;
                if (rotatedMap[nr][nc] > 0) ++cnt;
            }
            if (cnt >= 3) updatedMap[r][c] = rotatedMap[r][c];
            else updatedMap[r][c] = rotatedMap[r][c] - 1;
        }
    }

    return updatedMap
}

function searchLagest() {
    const dr = [0, 0, 1, -1]
    const dc = [1, -1, 0, 0]
    let largest = 0;
    const visit = Array.from({length : mapLength}, () => Array(mapLength).fill(false))
    
    for (let r = 0; r < mapLength; ++r) {
        for (let c = 0; c < mapLength; ++c) {
            if (visit[r][c] || map[r][c] <= 0) continue;
            largest = Math.max(largest, dfs(r, c))
        }
    }

    function dfs(r, c) {
        visit[r][c] = true;
        let ret = 1;

        for (let i = 0; i < 4; ++i) {
            const nr = r + dr[i]
            const nc = c + dc[i]
            if (nr < 0 || nr >= mapLength || nc < 0 || nc >= mapLength) continue
            if (visit[nr][nc] || map[nr][nc] <= 0) continue;
            ret += dfs(nr, nc)
        } 
        return ret;
    }
    
    return largest
}
