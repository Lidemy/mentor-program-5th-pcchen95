window.onload = () => {
  const apiUrl = 'https://calm-badlands-82392.herokuapp.com'
  document.querySelector('.event__btn').addEventListener('click', (e) => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        document.querySelector('.main-area').classList.add('hide')
        document.querySelector('.prize__main').classList.remove('hide')
        const { prize, content, imgUrl } = data
        document.querySelector('.prize__main').style.backgroundImage = `url(${imgUrl})`
        document.querySelector('.prize__name h2').innerText = prize
        document.querySelector('.prize__content h3').innerText = content
      }).catch((err) => {
        alert('系統不穩定，請再試一次')
        window.location.reload()
      })
  })

  document.querySelector('.lottery-again').addEventListener('click', (e) => {
    document.querySelector('.main-area').classList.remove('hide')
    document.querySelector('.prize__main').classList.add('hide')
  })
}
