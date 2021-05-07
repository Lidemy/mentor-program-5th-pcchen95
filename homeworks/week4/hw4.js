/* eslint-disable quote-props */
const request = require('request')

const option = {
  url: 'https://api.twitch.tv/kraken/games/top',
  headers: {
    'Client-ID': 'tdvc2nlt9v001vzbdgzoon7av64cd2',
    'Accept': 'application/vnd.twitchtv.v5+json'
  }
}

request(option,
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
    for (let i = 0; i < json.top.length; i++) {
      console.log(json.top[i].viewers, json.top[i].game.name)
    }
  })
