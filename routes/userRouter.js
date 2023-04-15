const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const AuthMiddleware = require('../middleware/AuthMiddleware')

router.get('/get/:id', userController.getUser)
    router.get('/findRoom/', AuthMiddleware, userController.findUserRoom)
router.get('/isAuth', AuthMiddleware, userController.isAuth)
router.get('/create/:name', userController.createUser)
router.get('/put/:roomId', AuthMiddleware, userController.putUserInRoom)
router.get('/changeName/:name', AuthMiddleware, userController.changeName)

module.exports = router