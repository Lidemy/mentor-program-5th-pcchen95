const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')

const app = express()
const port = process.env.PORT || 5001
const userController = require('./controllers/user')
const articleController = require('./controllers/article')

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(session({
  secret: process.env.SESSION_SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(flash())
app.use((req, res, next) => {
  res.locals.username = req.session.username
  res.locals.errMessage = req.flash('errMessage')
  next()
})

function redirectBack(req, res) {
  res.redirect('back')
}

app.get('/', articleController.index)
app.get('/articles', articleController.indexAll)
app.get('/blog_page/:id', articleController.indexOne)
/* app.get('/register', userController.register)
app.post('/register', userController.handleRegister, redirectBack) */
app.get('/login', userController.login)
app.post('/login', userController.handleLogin, redirectBack)
app.get('/logout', userController.logout)
app.get('/admin', articleController.admin, redirectBack)
app.get('/add_article', articleController.add, redirectBack)
app.post('/add_article', articleController.handleAdd, redirectBack)
app.get('/delete_article/:id', articleController.delete, redirectBack)
app.get('/update_article/:id', articleController.edit, redirectBack)
app.post('/update_article/:id', articleController.handleEdit, redirectBack)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
