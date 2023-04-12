const ApiError = require('../error/ApiError')
const gameService = require('../service/gameService')
const roomService = require("../service/roomService");
const questionService = require("../service/questionService");


class GameController {
    async get(req, res, next) {
        const {id} = req.params
        try {
            const result = await gameService.get(id)
            return res.json(result)
        } catch (e) {
            next(e)
        }
    }

    async getRoom(req, res, next) {
        const {roomId} = req.params
        try {
            const result = await gameService.getRoom(roomId)
            return res.json(result)
        } catch (e) {
            next(e)
        }
    }

    async create(req, res, next) {
        const {roomId} = req.params
        const room = await roomService.getRoom(roomId)
        const prevGames = await gameService.getPrev(roomId)
        try {
            const question = await questionService.getRandom(room.complicity, room.experimental, room.loud_quiz, prevGames)
            if (!question.length) {
                return next(ApiError.internal("Вопросы кончились! Соре"))
            }
            const result = await gameService.create(roomId, question[0].id)
            return res.json(result)
        } catch (e) {
            next(e)
        }
    }

    async setStatus(req, res, next) {
        const {gameId} = req.params
        try {
            const result = await gameService.setGameStatus(gameId)
            return res.json(result)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new GameController()