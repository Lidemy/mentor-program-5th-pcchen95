/* eslint-disable arrow-body-style */
const db = require('../models')
const { uploadImg, deleteImg } = require('./imgur.js')

const { Prize } = db
const album = 'VuvYUaD'

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
          const json = JSON.stringify(prize, null, 4)
          return res.send(json)
        }
      }
    }).catch(() => {
      return res.send('Error')
    })
  },

  getAll: (req, res) => {
    if (!req.session.username) {
      return res.redirect('/login')
    }
    Prize.findAll().then((prizes) => {
      res.render('admin/prize/prize', {
        prizes
      })
    })
  },
  add: (req, res) => {
    if (!req.session.username) {
      return res.redirect('/login')
    }
    res.render('admin/prize/add_prize')
  },

  handleAdd: (req, res, next) => {
    if (!req.session.username) {
      return res.redirect('/login')
    }
    const { prize, content } = req.body
    if (!prize || !content) {
      req.flash('errMessage', '需填入完整資料')
      return next()
    }
    const encodeImage = req.file.buffer.toString('base64')
    uploadImg(encodeImage, album, (err, link) => {
      if (err) {
        req.flash('errMessage', err.toString())
        return next()
      }
      return Prize.create({
        prize,
        content,
        probability: 0,
        imgUrl: link,
        userId: 2
      }).then(() => {
        res.redirect('/prize_management')
      }).catch((err) => {
        req.flash('errMessage', err.toString())
        return next()
      })
    })
  },

  delete: async(req, res) => {
    if (!req.session.username) {
      return res.redirect('/login')
    }

    const prize = await Prize.findOne({
      where: {
        id: req.params.id
      }
    })

    if (prize.probability !== 0) {
      req.flash('errMessage', '不可刪除機率不為 0 之項目')
      return res.redirect('/prize_management')
    }
    deleteImg(prize.imgUrl, (err) => {
      if (err) {
        req.flash('errMessage', err.toString())
        return res.redirect('/prize_management')
      }
    })

    prize.destroy().then(() => {
      return res.redirect('/prize_management')
    }).catch((err) => {
      req.flash('errMessage', err.toString())
      return res.redirect('/prize_management')
    })
  },

  update: (req, res) => {
    if (!req.session.username) {
      return res.redirect('/login')
    }
    Prize.findOne({
      where: {
        id: req.params.id
      }
    }).then((prize) => {
      res.render('admin/prize/update_prize', {
        prize
      })
    })
  },

  handleUpdate: async(req, res, next) => {
    if (!req.session.username) {
      return res.redirect('/login')
    }
    const imgUrl = req.file
    const { prize, content } = req.body
    if (!prize || !content) {
      req.flash('errMessage', '獎項名稱及內容不得為空')
      return next()
    }

    let item
    try {
      item = await Prize.findOne({
        where: {
          id: req.params.id
        }
      })
    } catch (err) {
      req.flash('errMessage', err.toString())
      return next()
    }

    const param = {
      prize,
      content
    }

    if (imgUrl) {
      deleteImg(item.imgUrl, (err) => {
        if (err) {
          req.flash('errMessage', err.toString())
          return next()
        }
      })
      const encodeImage = req.file.buffer.toString('base64')
      uploadImg(encodeImage, album, (err, link) => {
        if (err) {
          req.flash('errMessage', err.toString())
          return next()
        }
        param.imgUrl = link
        item.update(param).then(() => {
          res.redirect('/prize_management')
        }).catch((err) => {
          req.flash('errMessage', err.toString())
          return next()
        })
      })
    } else {
      item.update(param).then(() => {
        res.redirect('/prize_management')
      }).catch((err) => {
        req.flash('errMessage', err.toString())
        return next()
      })
    }
  },

  handleUpdateProb: (req, res, next) => {
    if (!req.session.username) {
      return res.redirect('/login')
    }
    const ids = req.body.id
    const probabilities = req.body.probability

    if (probabilities.indexOf('') >= 0) {
      req.flash('errMessage', '請填入完整資料')
      return next()
    }

    const reducer = (accumulator, currentValue) => {
      accumulator = Math.round(accumulator * 100) / 100
      currentValue = Math.round(currentValue * 100) / 100
      return Number(accumulator) + Number(currentValue)
    }
    const sum = probabilities.reduce(reducer)
    if (sum !== 1) {
      req.flash('errMessage', '機率總和不為 1')
      return next()
    }

    Promise.all(ids.map((id) => {
      const n = ids.indexOf(id)
      return Prize.findOne({
        where: {
          id
        }
      }).then((item) => {
        return item.update({
          probability: probabilities[n]
        })
      })
    })).then(() => {
      res.redirect('/prize_management')
    }).catch((err) => {
      req.flash('errMessage', err.toString())
      return next()
    })
  }
}

module.exports = prizeController
