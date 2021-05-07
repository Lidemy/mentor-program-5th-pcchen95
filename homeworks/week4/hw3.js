const request = require('request')
const process = require('process')

const baseURL = 'https://restcountries.eu/rest/v2/name'

request(`${baseURL}/${process.argv[2]}`,
  (error, response, body) => {
    if (error) {
      console.log(error)
      return
    }
    let json
    try {
      json = JSON.parse(body)
    } catch (e) {
      console.log(e)
      return
    }
    if (response.statusCode >= 200 && response.statusCode < 300) {
      for (let i = 0; i < json.length; i++) {
        console.log('============')
        console.log('國家：', json[i].name)
        console.log('首都：', json[i].capital)
        console.log('貨幣：', json[i].currencies[0].code)
        console.log('國碼：', json[i].callingCodes[0])
      }
    } else {
      console.log('找不到國家資訊')
    }
  })
