const request = require('request')
const process = require('process')

const command = process.argv[2]
const input = process.argv[3]
const APIURL = 'https://lidemy-book-store.herokuapp.com/books'
let json

if (command === 'list') {
  listBooks()
} else if (command === 'read') {
  readBooks(input)
} else if (command === 'create') {
  createBooks(input)
} else if (command === 'delete') {
  deleteBooks(input)
} else if (command === 'update') {
  updateBooks(input, process.argv[4])
} else {
  console.log('指令錯誤')
}

function listBooks() {
  request(`${APIURL}?_limit=20`, (error, response, body) => {
    if (error) {
      console.log(error)
      return
    }
    try {
      json = JSON.parse(body)
    } catch (e) {
      console.log(e)
      return
    }
    if (response.statusCode >= 200 && response.statusCode < 300) {
      for (let i = 0; i < json.length; i++) {
        console.log(json[i].id, json[i].name)
      }
    } else {
      console.log('查詢失敗')
    }
  })
}

function readBooks(id) {
  request(`${APIURL}/${id}`, (error, response, body) => {
    if (error) {
      console.log(error)
      return
    }
    try {
      json = JSON.parse(body)
    } catch (e) {
      console.log(e)
      return
    }
    if (response.statusCode >= 200 && response.statusCode < 300) {
      console.log(json.name)
    } else {
      console.log('查詢失敗')
    }
  })
}

function createBooks(bookName) {
  request.post(
    {
      url: APIURL,
      form: {
        name: bookName
      }
    },
    (error, response, body) => {
      if (error) {
        console.log(error)
        return
      }
      try {
        json = JSON.parse(body)
      } catch (e) {
        console.log(e)
        return
      }
      if (response.statusCode >= 200 && response.statusCode < 300) {
        console.log('新增成功')
      } else {
        console.log('新增失敗')
      }
    }
  )
}

function deleteBooks(id) {
  request.delete(`${APIURL}/${id}`, (error, response, body) => {
    if (error) {
      console.log(error)
      return
    }
    if (response.statusCode >= 200 && response.statusCode < 300) {
      console.log('刪除成功')
    } else {
      console.log('刪除失敗')
    }
  })
}

function updateBooks(id, newName) {
  request.patch(
    {
      url: `${APIURL}/${id}`,
      form: {
        name: newName
      }
    },
    (error, response, body) => {
      if (error) {
        console.log(error)
        return
      }
      if (response.statusCode >= 200 && response.statusCode < 300) {
        console.log('更新成功')
      } else {
        console.log('更新失敗')
      }
    }
  )
}
