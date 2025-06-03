const fs = require('fs')
const input = fs.readFileSync(0).toString().trim().split('\n')

let T = Number(input.shift())

while (T--) {
    const [N, W] = input[0].split(' ').map(Number)
    const line1 = input[1].split(' ').map(Number)
    const line2 = input[2].split(' ').map(Number)
    solve(N, W, line1, line2);
    input.splice(0, 3)
}

function solve(N, W, line1, line2) {
    const isPair = (a, b) => a + b <= W
    const [ans1, ans2, ans3, ans4] = [
            tryDp(true, true),
            tryDp(true, false),
            tryDp(false, true),
            tryDp(false, false),
    ]
    
    console.log(Math.min(ans1, ans2, ans3, ans4))

    function tryDp(upPair, downPair) {
        // 0 -> 두 칸이 모두 차있는 경우
        // 1 -> 윗 칸만 차있는 경우
        // 2 -> 아랫칸만 차있는 경우
        const dp = Array.from({length : 3}, () => Array(N + 1).fill(Infinity))
        if (N === 1) return isPair(line1[0], line2[0]) ? 1 : 2 
        dp[0][1] = isPair(line1[0], line2[0]) ? 1 : 2
        dp[1][1] = 1
        dp[2][1] = 1

        if (upPair && !isPair(line1[0], line1[N - 1])) return Infinity
        if (downPair && !isPair(line2[0], line2[N - 1])) return Infinity

        if (upPair && downPair) { dp[0][1] = 2; dp[1][1] = Infinity; dp[2][1] = Infinity }
        if (!upPair && downPair) { dp[0][1] = 2; dp[1][1] = Infinity }
        if (upPair && !downPair) { dp[0][1] = 2; dp[2][1] = Infinity }
        if (!upPair && !downPair) { dp[0][0] = 0; }
        
        

        for (let i = 2; i <= N; ++i) {
            dp[0][i] = Math.min(
                dp[0][i - 1] + (isPair(line1[i - 1], line2[i - 1]) ? 1 : 2),
                dp[1][i - 1] + (( isPair(line2[i - 2], line2[i - 1]) || isPair(line1[i - 1], line2[i - 1]) ) ? 2 : 3),
                dp[2][i - 1] + (( isPair(line1[i - 2], line1[i - 1]) || isPair(line1[i - 1], line2[i - 1]) ) ? 2 : 3),
                (isPair(line1[i - 1], line1[i - 2]) && isPair(line2[i - 1], line2[i - 2])) ? dp[0][i - 2] + 2 : Infinity
            )
            dp[1][i] = Math.min(
                dp[0][i - 1] + 1,
                dp[1][i - 1] + 2,
                dp[2][i - 1] + (isPair(line1[i - 2], line1[i - 1]) ? 1 : 2)
            )
            dp[2][i] = Math.min(
                dp[0][i - 1] + 1,
                dp[1][i - 1] + (isPair(line2[i - 2], line2[i - 1]) ? 1 : 2),
                dp[2][i - 1] + 2
            )
        }

        if (upPair && !downPair) return dp[2][N]
        if (!upPair && downPair) return dp[1][N]
        if (upPair && downPair) return dp[0][N - 1]

        return dp[0][N]
    }
}
