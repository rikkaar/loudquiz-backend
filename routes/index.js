const Router = require('express').Router
const router = new Router()

const userRouter = require('./userRouter')
const roomRouter = require('./roomRouter')
const gameRouter = require('./gameRouter')
const answerRouter = require('./answerRouter')
const feedbackRouter = require('./feedbackRouter')
const questionRouter = require('./questionRouter')

const mockController = require('../controllers/mockController')

router.use('/user', userRouter)
router.use('/room', roomRouter)
router.use('/game', gameRouter)
router.use('/question', questionRouter)
router.use('/feedback', feedbackRouter)
router.use('/answer', answerRouter)
router.get('/mock', mockController.generate)

module.exports = router