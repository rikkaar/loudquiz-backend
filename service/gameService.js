const {Game} = require('../models/models')
const ApiError = require('../error/ApiError')
const roomService = require('../service/roomService')
const answerService = require('../service/answerService')
const questionService = require('../service/questionService')


class GameService {
    async get (id) {
        return await Game.findAll({where: {id}})
    }

    async getRoom (roomId) {
        return await Game.findAll({where: {roomId}})
    }

    async setGameStatus(gameId) {
        const game = await Game.findByPk(gameId)
        const userList = await roomService.userList(game.dataValues.roomId)
        const answerList = await answerService.getAnswers(gameId)
        const answer = await questionService.get(game.dataValues.questionId)
        console.log(answer.dataValues.answer)
        console.log(userList.length)
        console.log(answerList.length - 1)
        if (userList.length - 1 === answerList.length) {
            let status = true
            answerList.map(ans => {
                if (answer.dataValues.answer !== ans.dataValues.answer) {
                    status = false
                }
            })
            await game.update({status})
            return status
        }
        else throw ApiError.badRequest(`Не все пользователи дали ответ`)
    }

    async getTurn(roomId) { // Возвращает количество игр (конов) для комнаты
        return await Game.count({where: {roomId}})
    }

    async create (roomId, questionId) {
        return await Game.create({roomId, questionId})
    }

    async getPrev(roomId) {
        return await Game.findAll({where: {roomId}})
    }

}

module.exports = new GameService()