const express = require('express')
const { isLoggedIn } = require('../middlewares')
const router = express.Router()

router.get('/secret', isLoggedIn, (req, res, next) => {
  res.json({
    secret: 42,
    user: req.user,
  })
})


router.get('/home',  (req, res, next) => {
  console.log("hitting home")

  res.json({
      body: "helloooo"
  })
})


module.exports = router
