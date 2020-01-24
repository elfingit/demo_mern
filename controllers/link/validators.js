const {check} = require('express-validator')

const validators = {
  generate: [
    check('from', 'Input correct url')
      .isURL()
  ]
}

module.exports = validators