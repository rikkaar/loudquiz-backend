const Router = require('express')
const router = new Router()
const roomController = require('../controllers/roomController')
const AuthMiddleware = require('../middleware/AuthMiddleware')

router.get('/get/:roomId', roomController.getRoom)
router.get('/getBySocket/:socket', AuthMiddleware, roomController.getRoomBySocket)
router.get('/getByCode/:code', AuthMiddleware, roomController.getRoomByCode)
router.get('/create', AuthMiddleware, roomController.createRoom)
router.delete('/', AuthMiddleware, roomController.deleteRoom)
router.get('/:roomId/complicity/:complicity', AuthMiddleware, roomController.setComplicity)
router.get('/:roomId/experimental/:experimental', AuthMiddleware, roomController.setExperimental)
router.get('/:roomId/loud_quiz/:loud_quiz', AuthMiddleware, roomController.setLoudQuiz)


module.exports = router