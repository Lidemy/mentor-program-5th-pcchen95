/* 機率驗證 */
const request = require('request')

const n = 1000
getPrizes(n, countPrize)

function getPrizes(n, cb) {
  for (let i = 0; i < n; i++) {
    request('https://calm-badlands-82392.herokuapp.com', (err, res, body) => {
      const json = JSON.parse(body)
      cb(json.prize)
    })
  }
}

let first = 0
let second = 0
let third = 0
let none = 0
let count = 0

function countPrize(prize) {
  count++
  if (prize === '頭獎') {
    first++
  }

  if (prize === '二獎') {
    second++
  }
  if (prize === '三獎') {
    third++
  }
  if (prize === '銘謝惠顧') {
    none++
  }

  if (count === n) {
    console.log('頭獎次數：', first, ', 頭獎機率：', first / n)
    console.log('二獎次數：', second, ', 二獎機率：', second / n)
    console.log('三獎次數：', third, ', 三獎機率：', third / n)
    console.log('共估次數：', none, ', 共估機率：', none / n)
  }
}

/*
  頭獎次數： 90 , 頭獎機率： 0.09
  二獎次數： 207 , 二獎機率： 0.207
  三獎次數： 313 , 三獎機率： 0.313
  共估次數： 390 , 共估機率： 0.39
  ---
  頭獎次數： 98 , 頭獎機率： 0.098
  二獎次數： 221 , 二獎機率： 0.221
  三獎次數： 300 , 三獎機率： 0.3
  共估次數： 381 , 共估機率： 0.381
  ---
  頭獎次數： 93 , 頭獎機率： 0.093
  二獎次數： 204 , 二獎機率： 0.204
  三獎次數： 304 , 三獎機率： 0.304
  共估次數： 399 , 共估機率： 0.399
  ---
  頭獎次數： 101  頭獎機率： 0.101
  二獎次數： 182  二獎機率： 0.182
  三獎次數： 297  三獎機率： 0.297
  共估次數： 420  共估機率： 0.42
  ---
  頭獎次數： 107 , 頭獎機率： 0.107
  二獎次數： 190 , 二獎機率： 0.19
  三獎次數： 298 , 三獎機率： 0.298
  共估次數： 405 , 共估機率： 0.405
*/
