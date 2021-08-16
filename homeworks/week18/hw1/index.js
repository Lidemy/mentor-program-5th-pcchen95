const express = require('express')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const multer = require('multer')

const app = express()
const port = process.env.PORT || 3001
const pageController = require('./controllers/page')
const userController = require('./controllers/user')
const menuController = require('./controllers/menu')
const faqController = require('./controllers/faq')
const prizeController = require('./controllers/prize')

const upload = multer()

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

app.get('/', pageController.front)
app.get('/faq', pageController.faq)
app.get('/lottery', pageController.lottery)
app.get('/menu', pageController.menu)
app.get('/admin', pageController.admin)

app.get('/register', userController.register)
app.post('/register', userController.handleRegister, redirectBack)
app.get('/login', userController.login)
app.post('/login', userController.handleLogin, redirectBack)
app.get('/logout', userController.logout)

app.get('/menu_management', menuController.getAll)
app.get('/add_menu', menuController.add)
app.post('/add_menu', upload.single('img'), menuController.handleAdd, redirectBack)
app.get('/delete_menu/:id', menuController.delete, redirectBack)
app.get('/update_menu/:id', menuController.update, redirectBack)
app.post('/update_menu/:id', upload.single('img'), menuController.handleUpdate, redirectBack)

app.get('/faq_management', faqController.getAll)
app.get('/add_faq', faqController.add)
app.post('/add_faq', faqController.handleAdd, redirectBack)
app.get('/delete_faq/:id', faqController.delete)
app.get('/update_faq/:id', faqController.update)
app.post('/update_faq/:id', faqController.handleUpdate, redirectBack)
app.get('/order_faq', faqController.changeOrder)
app.post('/order_faq', faqController.handleChangeOrder, redirectBack)

app.get('/lottery_draw', prizeController.draw)
app.get('/prize_management', prizeController.getAll)
app.get('/add_prize', prizeController.add)
app.post('/add_prize', upload.single('imgUrl'), prizeController.handleAdd, redirectBack)
app.get('/delete_prize/:id', prizeController.delete, redirectBack)
app.get('/update_prize/:id', prizeController.update)
app.post('/update_prize/:id', upload.single('imgUrl'), prizeController.handleUpdate, redirectBack)
app.post('/update_prob', prizeController.handleUpdateProb, redirectBack)

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
