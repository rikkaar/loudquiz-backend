const ApiError = require('../error/ApiError')
const answerService = require('../service/answerService')


class AnswerController {
    async get(req, res, next) {
        const {id} = req.params
        try {
            const result = await answerService.get(id)
            return res.json(result)
        } catch (e) {
            next(e)
        }
    }

    async set(req, res, next) {
        const {userId, answer, gameId} = req.body
        try {
            const result = await answerService.set(answer, gameId, userId)
            return res.json(result)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new AnswerController()