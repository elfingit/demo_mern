const {validationResult} = require('express-validator')
const config = require('config')
const bcrypt = require('bcryptjs')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')


const endPoints = {
    registration: async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(422).json({
                    errors: errors.array(),
                    message: 'Invalid data'
                })
            }

            const {email, password} = req.body

            const candidate = await User.findOne({ email })

            if (candidate) {
                return res.status(422).json({
                    errors: [
                        {
                            param: 'email',
                            msg: 'This email already been taken'
                        }
                    ]
                })
            }

            const hashedPwd = await bcrypt.hash(password, 12)
            const user = new User({email, password: hashedPwd})

            await user.save()

            res.status(201).json({
                message: 'User has been created'
            })

        } catch (e) {
            res.status(500).json({
                message: 'Something went wrong, please try again later'
            })

            console.log('Registration error: ', e.message);
        }
    },

    login: async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(422).json({
                    errors: errors.array(),
                    message: 'Invalid data'
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({ email })

            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                })
            }

            const isPasswordMatch = await bcrypt.compare(password, user.password)

            if (!isPasswordMatch) {
                return res.status(400).json({
                    message: 'Invalid authenticate data'
                })
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwt_secret_key'),
                { expiresIn: '1m'}
            )

            res.json({
                token, userId: user.id
            })

        } catch (e) {
            res.status(500).json({
                message: 'Something went wrong, please try again later'
            })

            console.log('Login error: ', e.message);
        }
    }
}

module.exports = endPoints