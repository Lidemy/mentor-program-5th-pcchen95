const express = require('express')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')

const app = express()
const port = process.env.PORT || 4001
const prizeController = require('./controller/prize')
const userController = require('./controller/user')

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

app.get('/login', userController.login)
app.post('/login', userController.handleLogin, redirectBack)
app.get('/logout', userController.logout)

app.get('/', prizeController.draw)
app.get('/admin', prizeController.getAll)
app.get('/update/:id', prizeController.update, redirectBack)
app.post('/update/:id', prizeController.handleUpdate, redirectBack)
app.get('/add', prizeController.add)
app.post('/add', prizeController.handleAdd, redirectBack)
app.get('/delete/:id', prizeController.delete)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
