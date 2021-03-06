const {Router} = require('express')
const router = Router()
const auth = require('../middleware/auth.middleware')
const {endPoints, validators} = require('../controllers/link')


router.post('/generate', auth, validators.generate, (req, res) => {
  endPoints.generate(req, res)
})

router.get('/', auth, (req, res) => {
  endPoints.index(req, res)
})

router.get('/:id', auth, (req, res) => {
  endPoints.show(req, res)
})

module.exports = router