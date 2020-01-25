const Link = require('../../models/Link')
const config = require('config')
const shortid = require('shortid')
const {validationResult} = require('express-validator')

const endPoints = {

  generate: async (req, res) => {
    try {

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.array(),
          message: 'Invalid data'
        })
      }

      const appUrl = config.get('app_url')
      const { from } = req.body

      const code = shortid.generate()

      const existing = await Link.findOne({ main: from, owner: req.user.userId })

      if (existing) {
        return res.json({ link: existing })
      }

      const alias = appUrl + '/t/' + code

      const link = new Link({
        code, alias, main: from, owner: req.user.userId
      })

      await link.save()

      return res.status(201).json(link)

    } catch (e) {
      res.status(500).json({
        message: 'Something went wrong, please try again later'
      })

      console.log('Generate url', e.message);
    }
  },

  index: async (req, res) => {
    try {
      const links = await Link.find({ owner: req.user.userId })
      res.json(links)
    } catch (e) {
      res.status(500).json({
        message: 'Something went wrong, please try again later'
      })
    }
  },

  show: async (req, res) => {
    try {
      const link = await Link.findById(req.params.id)
      res.json(link)
    } catch (e) {
      res.status(500).json({
        message: 'Something went wrong, please try again later'
      })
    }
  }

}

module.exports = endPoints