const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

let T = Number(input.shift())

while (T --) {
    const cards = input[1].split(' ').map(Number)
    const dp = Array.from({length : cards.length}, () => Array(cards.length).fill(-1))

    console.log(recur(0, cards.length - 1, true))

    function recur(start, end, turn) {
        if (end < start) return 0
        if (dp[start][end] !== -1) return dp[start][end]

        if (turn) {
            dp[start][end] = Math.max(recur(start + 1, end, !turn) + cards[start], recur(start, end - 1, !turn) + cards[end])
        } else {
            dp[start][end] = Math.min(recur(start + 1, end, !turn), recur(start, end - 1, !turn))
        }

        return dp[start][end]
    }

    input.splice(0, 2)
}
