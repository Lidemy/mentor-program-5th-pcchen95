/* eslint-disable no-unused-vars, import/prefer-default-export */
import $ from 'jquery'
import { getComments, addComments } from './api'
import { appendCommentToDOM, appendStyle } from './utils'
import { cssTemplate, getForm } from './template'

export const init = (options) => {
  let siteKey = ''
  let apiUrl = ''
  let containerElement = null
  let commentDOM = null
  let hasNextPage = true
  let lastID = ''
  const limit = 5

  siteKey = options.siteKey
  apiUrl = options.apiUrl
  const commentsClassName = `${siteKey}-comments`
  const commentsSelector = `.${commentsClassName}`
  const formClassName = `${siteKey}-add-comment-form`
  const formSelector = `.${formClassName}`
  const btnClassName = `${siteKey}-read-more-btn`
  const btnSelector = `.${btnClassName}`

  containerElement = $(options.containerSelector)
  containerElement.append(getForm(siteKey))
  appendStyle(cssTemplate)

  commentDOM = $(commentsSelector)
  const loadComments = (apiUrl, commentDOM, cursor, limit, siteKey) => {
    getComments(apiUrl, cursor, limit, siteKey, (data) => {
      if (!data.ok) {
        console.log('!data.ok')
        alert(data.message)
        return
      }

      const { discussions } = data
      lastID = discussions[discussions.length - 2].id
      const itemsPerPage = discussions.length === limit + 1 ? limit : discussions.length
      for (let i = 0; i < itemsPerPage; i++) {
        appendCommentToDOM(commentDOM, discussions[i])
      }
      if (discussions.length < limit + 1) {
        $(btnSelector).attr('disabled', '')
        hasNextPage = false
      }
    })
  }

  loadComments(apiUrl, commentDOM, lastID, limit, siteKey)

  $(formSelector).submit((e) => {
    e.preventDefault()
    const nicknameDOM = $(`${formSelector} input[name=nickname]`)
    const contentDOM = $(`${formSelector} textarea[name=content]`)
    const newCommentData = {
      site_key: siteKey,
      nickname: nicknameDOM.val(),
      content: contentDOM.val()
    }
    addComments(apiUrl, siteKey, newCommentData, (data) => {
      if (!data.ok) {
        alert(data.message)
        return
      }
      nicknameDOM.val('')
      contentDOM.val('')
      appendCommentToDOM(commentDOM, newCommentData, true)

      if (hasNextPage) {
        const removeID = `#${lastID}`
        $(removeID).remove()
        lastID++
      }
    })
  })

  $(btnSelector).click((e) => {
    loadComments(apiUrl, commentDOM, lastID, limit, siteKey)
  })
}
