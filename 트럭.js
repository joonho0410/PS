const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')
const [N, L, W] = input.shift().split(' ').map(Number)
const trucks = input.shift().split(' ').map(Number)
const bridge = Array(L).fill(0);
let time = 0;
let curWeight = 0;

for (truck of trucks) {
    curWeight -= bridge[time++];
    while (curWeight + truck > W) {
        bridge.push(0);
        curWeight -= bridge[time++];
        if (curWeight + truck <= W) break;
    }
    curWeight += truck;
    bridge.push(truck);
}

console.log(time + L);