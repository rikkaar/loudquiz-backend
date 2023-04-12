const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')


router.get('/get/:room', userController.getUser)
router.get('/create/:name', userController.createUser)
router.get('/put/', userController.putUserInRoom)

module.exports = router