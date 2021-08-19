/* eslint-disable arrow-body-style */
const db = require('../models')

const { Faq } = db

const faqController = {
  getAll: (req, res) => {
    if (!req.session.username) {
      return res.redirect('/login')
    }
    Faq.findAll({
      order: [
        ['order', 'ASC']
      ]
    }).then((items) => {
      res.render('admin/faq/faq', {
        items
      })
    })
  },

  add: (req, res) => {
    if (!req.session.username) {
      return res.redirect('/login')
    }
    res.render('admin/faq/add_faq')
  },

  handleAdd: (req, res, next) => {
    if (!req.session.username) {
      return res.redirect('/login')
    }
    const { question, answer } = req.body
    if (!question || !answer) {
      req.flash('errMessage', '請填入所有欄位')
      return next()
    }
    Faq.create({
      question,
      answer,
      userId: 2
    }).then(() => {
      return res.redirect('/faq_management')
    }).catch(() => {
      return next()
    })
  },

  delete: (req, res) => {
    if (!req.session.username) {
      return res.redirect('/login')
    }
    Faq.findOne({
      where: {
        id: req.params.id
      }
    }).then((item) => {
      return item.destroy()
    }).then(() => {
      res.redirect('/faq_management')
    }).catch((err) => {
      req.flash('errMessage', err.toString())
      res.redirect('/faq_management')
    })
  },

  update: (req, res) => {
    if (!req.session.username) {
      return res.redirect('/login')
    }
    Faq.findOne({
      where: {
        id: req.params.id
      }
    }).then((item) => {
      res.render('admin/faq/update_faq', {
        item
      })
    })
  },

  handleUpdate: (req, res, next) => {
    if (!req.session.username) {
      return res.redirect('/login')
    }
    const { question, answer } = req.body
    if (!question || !answer) {
      req.flash('errMessage', '請填入所有欄位')
      return next()
    }
    Faq.findOne({
      where: {
        id: req.params.id
      }
    }).then((item) => {
      return item.update({
        question,
        answer
      })
    }).then(() => {
      res.redirect('/faq_management')
    }).catch((err) => {
      req.flash('errMessage', err.toString())
      return next()
    })
  },

  changeOrder: (req, res) => {
    if (!req.session.username) {
      return res.redirect('/login')
    }
    Faq.findAll({
      order: [
        ['order', 'ASC']
      ]
    }).then((items) => {
      res.render('admin/faq/order_faq', {
        items
      })
    })
  },

  handleChangeOrder: (req, res) => {
    if (!req.session.username) {
      return res.redirect('/login')
    }
    const idList = req.body.id

    Promise.all(idList.map((id) => {
      const order = idList.indexOf(String(id))
      return Faq.findOne({
        where: {
          id
        }
      }).then((question) => {
        return question.update({
          order: order + 1
        })
      })
    })).then(() => {
      res.redirect('/faq_management')
    }).catch((err) => {
      req.flash('errMessage', err.toString())
      res.redirect('/faq_management')
    })
  }
}

module.exports = faqController
