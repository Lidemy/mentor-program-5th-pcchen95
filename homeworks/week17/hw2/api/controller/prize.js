/* eslint-disable arrow-body-style */
const db = require('../models')

const { Prize } = db

const prizeController = {
  draw: (req, res) => {
    Prize.findAll({
      attributes: ['prize', 'content', 'probability', 'imgUrl']
    }).then((prizes) => {
      res.header('Access-Control-Allow-Origin', '*')
      let calProb = 0
      const randomNum = Math.random()
      for (const prize of prizes) {
        calProb += prize.probability
        if (calProb > randomNum) {
          // console.log('calProb: ', calProb, ' ,randomNum: ', randomNum)
          const json = JSON.stringify(prize, null, 4)
          return res.send(json)
        }
      }
    }).catch(() => {
      return res.send('Error')
    })
  },

  getAll: (req, res, next) => {
    if (!req.session.username) {
      return res.redirect('/login')
    }
    Prize.findAll().then((prizes) => {
      let totalProb = 0
      prizes.forEach((prize) => {
        totalProb += prize.probability
      })
      res.render('index', {
        prizes,
        totalProb
      })
    }).catch((err) => {
      req.flash('errMessage', err.toString())
      return next()
    })
  },
  update: (req, res, next) => {
    if (!req.session.username) {
      return res.redirect('/login')
    }
    Prize.findOne({
      where: {
        id: req.params.id
      }
    }).then((prize) => {
      res.render('update', {
        prize
      })
    }).catch((err) => {
      req.flash('errMessage', err.toString())
      return next()
    })
  },

  handleUpdate: (req, res) => {
    if (!req.session.username) {
      return res.redirect('/login')
    }
    const { prize, content, probability, imgUrl } = req.body
    Prize.findOne({
      where: {
        id: req.params.id
      }
    }).then((item) => {
      return item.update({
        prize,
        content,
        probability,
        imgUrl
      })
    }).then(() => {
      res.redirect('/admin')
    }).catch(() => {
      res.redirect('/admin')
    })
  },

  add: (req, res) => {
    if (!req.session.username) {
      return res.redirect('/login')
    }
    res.render('add')
  },

  handleAdd: (req, res, next) => {
    if (!req.session.username) {
      return res.redirect('/login')
    }
    const { prize, content, probability, imgUrl } = req.body
    // console.log(prize, content, probability)
    if (!prize || !content || !probability) {
      req.flash('errMessage', '需填入完整資料')
      return next()
    }
    Prize.create({
      prize,
      content,
      probability,
      imgUrl
    }).then(() => {
      res.redirect('/admin')
    }).catch((err) => {
      req.flash('errMessage', err.toString())
      return next()
    })
  },

  delete: (req, res) => {
    if (!req.session.username) {
      return res.redirect('/login')
    }
    Prize.findOne({
      where: {
        id: req.params.id
      }
    }).then((prize) => {
      return prize.destroy()
    }).then(() => {
      res.redirect('/admin')
    }).catch(() => {
      res.redirect('/admin')
    })
  }
}

module.exports = prizeController
