let zero = 0;
let one = 0;

function solution(arr) {
    const len = arr.length;
    let zero = 0;
    let one = 0;
    
    dq(0, 0, len, arr);
    return [zero, one]
    
    function dq(row, col, len, arr) {
        const first = arr[row][col]
        let isEqual = true;

        for (let r = 0; r < len; ++r){
            for (let c = 0; c < len; ++c) {
                if (first !== arr[row + r][col + c]) isEqual = false;
            }
        }

        if (isEqual) {
            if (first === 1) one += 1;
            if (first === 0) zero += 1;
            return ;
        }

        const nextLen = len / 2;
        dq(row, col, nextLen, arr)
        dq(row, col + nextLen, nextLen, arr)
        dq(row + nextLen, col, nextLen, arr)
        dq(row + nextLen, col + nextLen, nextLen, arr)
    }
}