/* eslint-disable arrow-body-style */
const db = require('../models')
const { uploadImg, deleteImg } = require('./imgur.js')

const { Menu } = db
const album = 'M2GrtR9'

const menuController = {
  getAll: (req, res) => {
    if (!req.session.username) {
      return res.redirect('/login')
    }
    Menu.findAll({
      order: [
        ['id', 'DESC']
      ]
    }).then((items) => {
      res.render('admin/menu/menu', {
        items
      })
    })
  },

  add: (req, res) => {
    if (!req.session.username) {
      return res.redirect('/login')
    }
    res.render('admin/menu/add_menu')
  },

  handleAdd: (req, res, next) => {
    if (!req.session.username) {
      return res.redirect('/login')
    }
    const { name, price } = req.body
    const img = req.file
    if (!name || !price || !img) {
      req.flash('errMessage', '請填入所有欄位')
      return next()
    }

    const encodeImage = req.file.buffer.toString('base64')
    uploadImg(encodeImage, album, (err, link) => {
      if (err) {
        req.flash('errMessage', err.toString())
        return next()
      }
      Menu.create({
        name,
        price,
        img: link,
        userId: 2
      }).then(() => {
        return res.redirect('/menu_management')
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

    let item
    try {
      item = await Menu.findOne({
        where: {
          id: req.params.id
        }
      })
    } catch (err) {
      req.flash('errMessage', err.toString())
      return res.redirect('/menu_management')
    }

    deleteImg(item.img, (err) => {
      if (err) {
        req.flash('errMessage', err.toString())
        return res.redirect('/menu_management')
      }
    })
    item.destroy().then(() => {
      res.redirect('/menu_management')
    }).catch((err) => {
      req.flash('errMessage', err.toString())
      res.redirect('/menu_management')
    })
  },

  update: (req, res, next) => {
    if (!req.session.username) {
      return res.redirect('/login')
    }
    Menu.findOne({
      where: {
        id: req.params.id
      }
    }).then((item) => {
      res.render('admin/menu/update_menu', {
        item
      })
    }).catch((err) => {
      req.flash('errMessage', err.toString())
      return next()
    })
  },

  handleUpdate: async(req, res, next) => {
    if (!req.session.username) {
      return res.redirect('/login')
    }
    const { name, price } = req.body
    const img = req.file
    if (!name || !price) {
      req.flash('errMessage', '品項及價格不得為空')
      return next()
    }

    let item
    try {
      item = await Menu.findOne({
        where: {
          id: req.params.id
        }
      })
    } catch (err) {
      req.flash('errMessage', err.toString())
      return next()
    }

    const param = {
      name,
      price
    }

    if (img) {
      deleteImg(item.img, (err) => {
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
        param.img = link
        item.update(param).then(() => {
          res.redirect('/menu_management')
        })
      })
    } else {
      item.update(param).then(() => {
        res.redirect('/menu_management')
      })
    }
  }
}

module.exports = menuController
