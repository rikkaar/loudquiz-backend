const ApiError = require('../error/ApiError')
const questionService = require('../service/questionService')
const roomService = require('../service/roomService')
const gameService = require('../service/gameService')
const {Game} = require("../models/models");

class QuestionController {
    async get(req, res, next) {
        const {id} = req.params
        try {
            const result = await questionService.get(id)
            return res.json(result)
        } catch (e) {
            next(e)
        }
    }

    async getRandom(req, res, next) {
        const {roomId} = req.params
        const room = await roomService.getRoom(roomId)
        const prevGames = await gameService.getPrev(roomId)
        try {
            const result = await questionService.getRandom(room.complicity, room.experimental, room.loud_quiz, prevGames)
            return res.json(result)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new QuestionController()