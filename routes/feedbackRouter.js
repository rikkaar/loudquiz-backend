const Router = require('express')
const router = new Router()
const feedbackController = require('../controllers/feedbackController')


router.get('/get/', feedbackController.get)


module.exports = router