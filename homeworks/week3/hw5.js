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
  const n = Number(lines[0])
  for (let i = 1; i <= n; i++) {
    const temp = lines[i].split(' ')
    const A = temp[0]
    const B = temp[1]
    const key = Number(temp[2])
    const digitA = temp[0].length
    const digitB = temp[1].length
    if ((digitA - digitB) * key > 0) {
      console.log('A')
    } else if ((digitA - digitB) * key < 0) {
      console.log('B')
    } else {
      console.log(numCompare(A, B, key))
    }
  }
}

function numCompare(a, b, key) {
  for (let i = 0; i < a.length; i++) {
    const diff = a[i] - b[i]
    if (diff * key > 0) {
      return 'A'
    } else if (diff * key < 0) {
      return 'B'
    }
  }
  return 'DRAW'
}
