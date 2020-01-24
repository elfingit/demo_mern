const {Router} = require('express')
const config = require('config')
const bcrypt = require('bcryptjs')
const {validators, endPoints} = require('../controllers/user')
const User = require('../models/User')
const router = Router()

router.post('/register', validators.registration, (req, resp) => {
    endPoints.registration(req, resp)
})

router.post('/login', validators.login, (req, resp) => {
    endPoints.login(req, resp)
})

module.exports = router