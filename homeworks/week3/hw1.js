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
  for (let i = 0; i < n; i++) {
    let result = ''
    for (let j = 0; j <= i; j++) {
      result += '*'
    }
    console.log(result)
  }
}
