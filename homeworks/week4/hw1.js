const request = require('request')

request('https://lidemy-book-store.herokuapp.com/books?_limit=10',
  (error, response, body) => {
    let json
    try {
      json = JSON.parse(body)
    } catch (e) {
      console.log(e)
      return
    }

    for (let i = 0; i < json.length; i++) {
      console.log(json[i].id, json[i].name)
    }
  })
