const bcrypt = require('bcrypt')
const db = require('../models')

// const saltRounds = 10
const { User } = db

const userController = {
/*
  register: (req, res) => {
    res.render('user/register')
  },

  handleRegister: (req, res, next) => {
    const { username, password } = req.body
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        req.flash('errMessage', err.toString())
        return next()
      }
      User.create({
        username,
        password: hash
      }).then((user) => {
        req.session.username = username
        req.session.userId = user.id
        return res.redirect('/')
      }).catch((err) => {
        req.flash('errMessage', err.toString())
        return next()
      })
    })
  },
*/
  login: (req, res) => {
    res.render('user/login')
  },

  logout: (req, res) => {
    req.session.username = null
    res.redirect('/')
  },

  handleLogin: async(req, res, next) => {
    const { username, password } = req.body
    if (!username || !password) {
      req.flash('errMessage', '請輸入完整資料')
      return next()
    }
    let user
    try {
      user = await User.findOne({
        where: {
          username
        }
      })
    } catch (err) {
      req.flash('errMessage', err.toString())
      return next()
    }
    if (!user) {
      req.flash('errMessage', '帳號錯誤')
      return next()
    }

    bcrypt.compare(password, user.password, (err, isSuccess) => {
      if (!isSuccess || err) {
        req.flash('errMessage', '密碼錯誤')
        return next()
      }
      req.session.username = user.username
      res.redirect('/')
    })
  }
}

module.exports = userController
