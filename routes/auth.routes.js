const {Router} = require('express')
const {validators, endPoints} = require('../controllers/user')
const router = Router()

router.post('/register', validators.registration, (req, resp) => {
    endPoints.registration(req, resp)
})

router.post('/login', validators.login, (req, resp) => {
    endPoints.login(req, resp)
})

module.exports = router