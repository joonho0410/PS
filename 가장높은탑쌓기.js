const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const N = Number(input.shift())
const blocks = []
const Weight = new Set();
const Width = new Set();

for (let i = 0; i < N; ++i) {
    const [width, height, weight] = input[i].split(' ').map(Number)
    Weight.add(weight)
    Width.add(width)
    blocks.push([width, weight, height, i + 1])
}

const orderWeight = [...Weight].sort((a, b) => a - b);
const orderWidth = [...Width].sort((a, b) => a - b);

const mapWeight = new Map();
const mapWidth = new Map();

orderWeight.forEach((e, idx) => mapWeight.set(e, idx + 1));
orderWidth.forEach((e, idx) => mapWidth.set(e, idx + 1));

const weightLen = mapWeight.size
const widthLen = mapWidth.size

for (block of blocks) {
    const [width, weight, height] = block;
    [block[0], block[1], block[2]] = [mapWidth.get(width), mapWeight.get(weight), height];
}

blocks.sort((a, b) => a[0] - b[0]);
const dp = Array.from({length : widthLen + 1}, () => Array(weightLen + 1).fill(-Infinity))
const order = Array.from({length: widthLen + 1}, () => Array.from({length: weightLen + 1}, () => []))

dp[0][0] = 0;

for (block of blocks) {
    const [s, w, h, num] = block;

    for (let i = s; i >= 0; --i) {
        for (let j = w; j >= 0; --j) {
            if (dp[s][w] < dp[i][j] + h) {
                dp[s][w] = dp[i][j] + h;
                order[s][w] = [...order[i][j], num]
            } 
        }
    }
}
let [ans, anss, answ] = [-Infinity, 0, 0];

for (let s = 0; s <= widthLen; ++s) {
    for (let w = 0; w <= weightLen; ++w ) {
        if (ans < dp[s][w]) [ans, anss, answ] = [dp[s][w], s, w];
    }
}

console.log(order[anss][answ].length)
console.log(order[anss][answ].join('\n'))
