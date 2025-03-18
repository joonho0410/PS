const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split(' ')

const [X, Y, D, T] = input;

const fullDistance = Math.sqrt(X * X + Y * Y)

const floor = Math.floor(fullDistance / D);
const ceil = Math.ceil(fullDistance / D)

const move1 = fullDistance;
const move2 = fullDistance < D ? 2 * T : ceil * T;
const move3 = floor * T + (fullDistance - floor * D)
const move4 = ceil * T + (ceil * D - fullDistance)

console.log(Math.min(move1, move2, move3, move4))