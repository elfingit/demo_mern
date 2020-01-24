const Link = require('../../models/Link')
const config = require('config')
const shortid = require('shortid')

const endPoints = {

  generate: async (req, res) => {
    try {
      const appUrl = config.get('app_url')
      const { from } = req.body

      const code = shortid.generate()

      const existing = await Link.findOne({ from })

      if (existing) {
        return res.json({ link: existing })
      }

      const to = appUrl + '/t/' + code

      const link = new Link({
        code, to, from, owner: req.user.userId
      })

      await link.save()

      res.status(201).json(link)

    } catch (e) {
      res.status(500).json({
        message: 'Something went wrong, please try again later'
      })
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