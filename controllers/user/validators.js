const {check} = require('express-validator')

const validators = {
    registration: [
        check('email', 'Input correct email')
            .normalizeEmail()
            .isEmail(),
        check('password', 'Password must be more than 5 symbols and less than 33.')
            .isLength({ min: 6, max: 32 })
    ],
    login: [
        check('email', 'Input correct email'),
        check('password', 'Input password')
          .exists()
    ]
}

module.exports = validators