const Router = require('express')
const router = new Router()
const answerController = require('../controllers/answerController')


router.get('/get/', answerController.get)
router.post('/set/', answerController.set)


module.exports = router