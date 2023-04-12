const Router = require('express')
const router = new Router()
const gameController = require('../controllers/gameController')
const questionController = require("../controllers/questionController");


router.get('/get/:id', gameController.get)
router.get('/getRoom/:roomId', gameController.getRoom)
router.get('/create/:roomId', gameController.create)
router.get('/setStatus/:gameId', gameController.setStatus)

module.exports = router