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
  for (let i = 1; i < lines.length; i++) {
    const num = Number(lines[i])
    console.log(isPrime(num))
  }
}

function isPrime(n) {
  if (n === 1) return 'Composite'
  else {
    for (let i = 2; i <= n / 2; i++) {
      if (n % i === 0) return 'Composite'
    }
    return 'Prime'
  }
}
