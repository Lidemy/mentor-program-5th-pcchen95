const db = require('../models')

const { Menu, Faq } = db

const pageController = {
  front: (req, res) => {
    res.render('index')
  },

  faq: (req, res) => {
    Faq.findAll({
      order: [
        ['order', 'ASC']
      ]
    }).then((items) => {
      res.render('faq', {
        items
      })
    })
  },

  lottery: (req, res) => {
    res.render('lottery')
  },

  menu: (req, res) => {
    Menu.findAll({
      order: [
        ['id', 'DESC']
      ],
      limit: 9
    }).then((items) => {
      res.render('menu', {
        items
      })
    })
  },

  admin: (req, res) => {
    if (!req.session.username) {
      return res.redirect('/login')
    }
    res.render('admin/admin')
  }
}

module.exports = pageController
