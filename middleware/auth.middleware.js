const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      return res.status(401).json({
        message: 'You are not authorized'
      })
    }

    const decoded = jwt.verify(token, config.get('jwt_secret_key'))
    req.user = decoded
    next()

  } catch (e) {
    console.log('Auth middleware', e.message);

    return res.status(401).json({
      message: 'You are not authorized'
    })
  }
}