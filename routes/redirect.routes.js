const {Router} = require('express')
const Link = require('../models/Link')

const router = Router()

router.get('/:code', async (req, res) => {
  try {

    const link = await Link.findOne({ code: req.params.code })

    if (link) {
      link.clicks++;
      link.save()

      return res.redirect(link.main)
    }

    res.status(404).json({
      message: 'Not found'
    })

  } catch (e) {
    console.log('Redirect error:', e.message);
    res.status(500).json({
      message: 'Something went wrong please try again later'
    })
  }
})

module.exports = router