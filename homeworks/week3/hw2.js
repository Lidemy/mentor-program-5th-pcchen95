const readline = require('readline')

const lines = []
const rl = readline.createInterface({
  input: process.stdin
})

rl.on('line', (line) => {
  lines.push(line)
})

rl.on('close', () => {
  solve(lines)
})

function solve(lines) {
  const temp = lines[0].split(' ')
  const start = Number(temp[0])
  const end = Number(temp[1])
  for (let i = start; i <= end; i++) {
    const digitNum = digit(i) // 判斷幾位數
    const numArr = num(i) // 拆出每個數字

    // 計算每個數字n次方
    if (i === cal(numArr, digitNum)) {
      console.log(i)
    }
  }
}

function digit(num) {
  num = num.toString()
  return num.length
}

function num(num) {
  const arr = []
  for (let i = 0; i < num.toString().length; i++) {
    arr.push(num.toString()[i])
  }
  return arr
}

function cal(arr, n) {
  let result = 0
  for (let i = 0; i < arr.length; i++) {
    result += Math.pow(arr[i], n)
  }
  return result
}
