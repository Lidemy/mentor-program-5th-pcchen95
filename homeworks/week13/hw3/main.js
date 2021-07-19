const apiUrl = 'https://api.twitch.tv/kraken'
const clientID = 'tdvc2nlt9v001vzbdgzoon7av64cd2'
const accept = 'application/vnd.twitchtv.v5+json'

function getTopGames(cb) {
  fetch(`${apiUrl}/games/top/?limit=5`, {
    headers: {
      'Client-ID': clientID,
      accept
    }
  })
    .then((response) => response.json())
    .then((data) => {
      cb(data)
    }).catch((err) => {
      console.log('error', err)
    })
}

function showTopStreams(game) {
  if (document.querySelector('.dummy')) {
    const childDummy = document.querySelectorAll('.dummy')
    for (let i = childDummy.length - 1; i >= 0; i--) {
      document.querySelector('.streams').removeChild(childDummy[i])
    }
  }
  fetch(`${apiUrl}/streams/?game=${game}&limit=20`, {
    headers: {
      'Client-ID': clientID,
      accept
    }
  })
    .then((response) => response.json())
    .then((data) => {
      appendStreams(data)
    }).catch((err) => {
      console.log('error', err)
    })
}

function appendStreams(streams) {
  for (let i = 0; i < streams.streams.length; i++) {
    const ch = streams.streams[i]
    const { url, logo, status } = ch.channel
    const name = ch.channel.display_name
    const preview = ch.preview.large
    const item = document.createElement('div')
    item.classList.add('streams__stream')
    item.innerHTML = `
      <a href=${url} target="_blank">
        <div class="streams__preview">
          <img src=${preview}>
        </div>
        <div class="streams__channel">
          <div class="streams__logo">
            <img src=${logo}>
          </div>
          <div class="streams__text">
            <div class="streams__status">
              ${status}
            </div>
            <div class="streams__name">
              ${name}
            </div>
          </div>
        </div>
      </a>`
    document.querySelector('.streams').appendChild(item)
  }
  const dummy = document.createElement('div')
  dummy.classList.add('dummy')
  document.querySelector('.streams').appendChild(dummy)
}

/* -----------------載入前 5 大熱門遊戲-------------------- */
getTopGames((topGames) => {
  for (let i = 0; i < topGames.top.length; i++) {
    const li = document.createElement('li')
    li.innerText = topGames.top[i].game.name
    if (i === 0) {
      li.classList.add('active')
    }
    document.querySelector('.navbar__games-button').appendChild(li)
  }
  let game = topGames.top[0].game.name
  /* -----------------載入各遊戲前 20 大熱門實況---------------- */
  document.querySelector('h2').innerText = game
  showTopStreams(game)

  /* ----------------點選上方按鈕更換遊戲--------------------- */
  document.querySelector('.navbar__games-button')
    .addEventListener('click', (e) => {
      if (e.target.tagName.toLowerCase() === 'li') {
        document.querySelector('.active').classList.remove('active')
        e.target.classList.add('active')
        game = e.target.innerText
        document.querySelector('h2').innerText = game
        document.querySelector('.streams').innerHTML = ''
        showTopStreams(game)
      }
    })
})
