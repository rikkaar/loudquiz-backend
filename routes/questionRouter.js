const Router = require('express')
const router = new Router()
const questionController = require('../controllers/questionController')


router.get('/get/:id', questionController.get)
router.get('/getRandom/:roomId', questionController.getRandom)


module.exports = router