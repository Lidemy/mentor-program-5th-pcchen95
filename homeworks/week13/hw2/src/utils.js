/* eslint-disable no-undef */
export const escapeHTML = (unsafe) =>
  unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

export const appendCommentToDOM = (container, { id, nickname, content }, isPrepend) => {
  const html = `
    <div class="card" id="${id}">
      <div class="card-body">
        <h5 class="card-title">${escapeHTML(nickname)}</h5>
        <p class="card-text">${escapeHTML(content)}</p>
      </div>
    </div>
  `
  if (isPrepend) {
    container.prepend($(html).hide().fadeIn('slow'))
  } else {
    container.append($(html).hide().fadeIn('slow'))
  }
}

export const appendStyle = (cssTemplate) => {
  const styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  styleElement.appendChild(document.createTextNode(cssTemplate))
  document.head.appendChild(styleElement)
}
