window.onload = () => {
  const clickList = [] // [這次點選的 item, 上次點選的 item]
  document.querySelector('section').addEventListener('click', (e) => {
    if (e.target.parentNode.classList.contains('question')) {
      clickList[0] = e.target
      if (clickList[1] && clickList[0] !== clickList[1]) {
        clickList[1].parentNode.nextSibling.nextSibling.classList.remove('active')
      }
      e.target.parentNode.nextSibling.nextSibling.classList.toggle('active')
      clickList[1] = e.target
    }
  })
}
