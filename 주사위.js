const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

const N = Number(input.shift())
const [a, b, c, d, e, f] = input.shift().split(' ').map(BigInt)

const n3 = BigInt(4);
const n2 = BigInt((N - 2) * 8) + 4n
const n1 = BigInt((N * N - 4 * N + 4) * 5);


