const bcrypt = require('bcrypt')
const db = require('../models')

const { User } = db

const userController = {
  login: (req, res) => {
    res.render('login')
  },

  handleLogin: async(req, res, next) => {
    const { username, password } = req.body
    if (!username || !password) {
      req.flash('errMessage', '請填入完整資料')
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
      res.redirect('/admin')
    })
  },

  logout: (req, res) => {
    req.session.username = null
    res.redirect('/admin')
  }
}

module.exports = userController
