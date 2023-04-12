const {Answers} = require('../models/models')
const ApiError = require('../error/ApiError')

class AnswerService {
    async get(id) {
        return await Answers.findAll({where: {id}})
    }

    async getAnswers(gameId) {
        return await Answers.findAll({
            where: {
                gameId
            }
        })
    }

    async set(answer, gameId, userId) {
        const ans = await Answers.findOne({
            where: {
                gameId,
                userId
            }
        })
        if (ans) {
            return ApiError.badRequest("Вы уже дали ответ на вопрос")
        }
        await Answers.create({answer, gameId, userId})
    }
}

module.exports = new AnswerService()