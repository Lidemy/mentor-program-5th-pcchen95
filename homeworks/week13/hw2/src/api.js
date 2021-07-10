import $ from 'jquery'

export const getComments = (apiUrl, cursor, limit, siteKey, cb) => {
  $.ajax({
    url: `${apiUrl}/api_comments.php?site_key=${siteKey}&limit=${limit}&cursor=${cursor}`
  }).done((data) => {
    if (!data.ok) {
      console.log('!data.ok')
      alert(data.message)
      return
    }
    cb(data)
  })
}

export const addComments = (apiUrl, siteKey, data, cb) => {
  $.ajax({
    type: 'POST',
    url: `${apiUrl}/api_add_comment.php`,
    data
  }).done((data) => {
    cb(data)
  })
}
