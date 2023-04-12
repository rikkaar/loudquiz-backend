const Router = require('express')
const router = new Router()
const roomController = require('../controllers/roomController')


router.get('/get/:roomId', roomController.getRoom)
router.get('/create', roomController.createRoom)
router.delete('/:roomId', roomController.deleteRoom)
router.get('/:roomId/complicity/:complicity', roomController.setComplicity)
router.get('/:roomId/experimental/:experimental', roomController.setExperimental)
router.get('/:roomId/loud_quiz/:loud_quiz', roomController.setLoudQuiz)


module.exports = router