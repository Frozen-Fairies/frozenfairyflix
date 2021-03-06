const router = require('express').Router()
const Film = require('../db/models/film')
const {User, Order} = require('../db/models')
const Sequelize = require('sequelize')

// .../api/admin/films/
router.get('/films', async (req, res, next) => {
  if (req.user) {
    try {
      const user = await User.findByPk(req.user.dataValues.id)
      if (user.isAdmin) {
        const films = await Film.findAll({
          order: [['title', 'ASC']]
        })
        res.json(films)
      } else {
        res.sendStatus(401)
      }
    } catch (err) {
      next(err)
    }
  } else {
    res.sendStatus(401)
  }
})

router.put('/films/:filmId', async (req, res, next) => {
  if (req.user) {
    try {
      const user = await User.findByPk(req.user.dataValues.id)
      if (user.isAdmin) {
        console.log(req.body)
        const film = await Film.findByPk(req.params.filmId)
        //            const obj = await film.update({...film, title: req.body.title})
        const obj = await film.update(req.body)
        res.status(200).json(obj)
      } else {
        res.sendStatus(401)
      }
    } catch (err) {
      next(err)
    }
  } else {
    res.sendStatus(401)
  }
})

// Gets all previous orders
router.get('/orders/history', async (req, res, next) => {
  if (req.user) {
    try {
      const user = await User.findByPk(req.user.dataValues.id)
      if (user.isAdmin) {
        const orders = await Order.findAll({
          include: [{model: Film}],
          where: {
            purchased: true
          }
        })
        res.json(orders)
      } else {
        res.sendStatus(401)
      }
    } catch (err) {
      next(err)
    }
  } else {
    res.sendStatus(401)
  }
})

router.get('/orders/history/:userId', async (req, res, next) => {
  if (req.user) {
    try {
      const user = await User.findByPk(req.user.dataValues.id)
      if (user.isAdmin) {
        const orders = await Order.findAll({
          include: [{model: Film}],
          where: {
            purchased: true,
            userId: req.params.userId
          }
        })
        res.json(orders)
      } else {
        res.sendStatus(401)
      }
    } catch (err) {
      next(err)
    }
  } else {
    res.sendStatus(401)
  }
})

router.get('/users/:userId', async (req, res, next) => {
  if (req.user) {
    try {
      const admin = await User.findByPk(req.user.dataValues.id)
      if (admin.isAdmin) {
        const user = await User.findByPk(req.params.userId)
        res.json(user)
      } else {
        res.sendStatus(401)
      }
    } catch (error) {
      next(error)
    }
  } else {
    res.sendStatus(401)
  }
})

router.get('/users/', async (req, res, next) => {
  if (req.user) {
    try {
      const admin = await User.findByPk(req.user.dataValues.id)
      if (admin.isAdmin) {
        const users = await User.findAll()
        res.json(users)
      } else {
        res.sendStatus(401)
      }
    } catch (error) {
      next(error)
    }
  } else {
    res.sendStatus(401)
  }
})

router.put('/users/:userId', async (req, res, next) => {
  if (req.user) {
    try {
      const admin = await User.findByPk(req.user.dataValues.id)
      if (admin.isAdmin) {
        const user = await User.findByPk(req.params.userId)
        let potentialNewEmail = req.body.email
        let potentialNewAddress = req.body.address

        if (!potentialNewEmail) {
          potentialNewEmail = user.email
        }
        if (!potentialNewAddress) {
          potentialNewAddress = user.address
        }
        const obj = user.update({
          name: req.body.name,
          email: potentialNewEmail,
          address: potentialNewAddress,
          password: req.body.password
        })
        res.status(200).json(obj)
      } else {
        res.sendStatus(401)
      }
    } catch (error) {
      next(error)
    }
  } else {
    res.sendStatus(401)
  }
})

module.exports = router
