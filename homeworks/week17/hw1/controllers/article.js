/* eslint-disable arrow-body-style */
const db = require('../models')

const { Article } = db

const articleController = {
  index: (req, res) => {
    Article.findAll({
      order: [
        ['id', 'DESC']
      ],
      limit: 5
    }).then((articles) => {
      res.render('index', {
        articles
      })
    })
  },

  indexAll: (req, res) => {
    Article.findAll({
      order: [
        ['id', 'DESC']
      ]
    }).then((articles) => {
      res.render('articles', {
        articles
      })
    })
  },

  indexOne: async(req, res) => {
    const article = await Article.findOne({
      where: {
        id: req.params.id
      }
    })

    if (!article) {
      return res.redirect('/')
    }

    res.render('blog_page', {
      article
    })
  },

  admin: (req, res, next) => {
    if (!req.session.username) {
      return next()
    }
    Article.findAll({
      order: [
        ['id', 'DESC']
      ]
    }).then((articles) => {
      res.render('admin', {
        articles
      })
    })
  },

  add: (req, res, next) => {
    if (!req.session.username) {
      return next()
    }
    res.render('add_article')
  },

  handleAdd: (req, res, next) => {
    if (!req.session.username) {
      return next()
    }
    const { title, content } = req.body
    if (!title || !content) {
      req.flash('errMessage', '文章標題及內容為必填欄位')
      return next()
    }

    Article.create({
      userId: 1,
      title,
      content
    }).then(() => {
      Article.findAll({
        order: [
          ['id', 'DESC']
        ],
        limit: 1
      }).then((article) => {
        res.redirect(`/blog_page/${article[0].dataValues.id}`)
      })
    }).catch((err) => {
      req.flash('errMessage', err.toString())
      return next()
    })
  },

  delete: (req, res, next) => {
    if (!req.session.username) {
      return next()
    }
    Article.findOne({
      where: {
        id: req.params.id
      }
    }).then((article) => {
      return article.destroy()
    }).then(() => {
      res.redirect('/admin')
    }).catch(() => {
      res.redirect('/admin')
    })
  },

  edit: (req, res, next) => {
    if (!req.session.username) {
      return next()
    }
    Article.findOne({
      where: {
        id: req.params.id
      }
    }).then((article) => {
      res.render('update_article', {
        article
      })
    })
  },

  handleEdit: (req, res, next) => {
    if (!req.session.username) {
      return next()
    }
    Article.findOne({
      where: {
        id: req.params.id
      }
    }).then((article) => {
      return article.update({
        title: req.body.title,
        content: req.body.content
      })
    }).then(() => {
      res.redirect(`/blog_page/${req.params.id}`)
    }).catch(() => {
      res.redirect('/')
    })
  }
}

module.exports = articleController
