const ApiError = require('../error/ApiError')
const questionService = require('../service/questionService')
const userService = require('../service/userSevice')
const roomService = require('../service/roomService')
const gameService = require('../service/gameService')
const answerService = require('../service/answerService')


class MockController {
    async generate(req, res, next) {
        const questions = [
            {
                title: "Денежная единица Израиля",
                answer: "Шекель",
                complicity: 1,
                loud_quiz: true
            },
            {
                title: "Нарисуте кошку",
                complicity: 2,
                loud_quiz: true
            },
            {
                title: "Бог Сновидений",
                answer: "Морфей",
                complicity: 3,
                loud_quiz: true
            }, {
                title: "Девиз Тимона и Пумбы",
                answer: "Акуна Матата",
                complicity: 2
            }, {
                title: "Старое название города Стамбул",
                answer: "Константинополь",
                complicity: 2
            },
            {
                title: "Аааа",
                answer: "Константинополь",
                complicity: 2
            },
            {
                title: "ЦЦЦЦЦ",
                answer: "Константинополь",
                complicity: 2
            },
        ]

        const users = [
            {id: 1, name: "Igor"},
            {id: 2, name: "Rosy"},
            {id: 3, name: "Alan"},
            {id: 4, name: "Dan"},
            {id: 5, name: "Mari"},
        ]

        const rooms = [
            {
                host: 1,
                mode: "multiplayer"
            },
            // {
            //     host: 2,
            //     mode: "singleplayer"
            // },
        ]
        const games = [
            {
                status: true,
                roomId: 1,
                questionId: 1,
            },
            {
                roomId: 1,
                questionId: 4,
            },
        ]

        const answers = [
            {
                answer: "Акуна Матата",
                gameId: 2,
                userId: 1
            },
            {
                answer: "Акуна Матата",
                gameId: 2,
                userId: 2
            },
            {
                answer: "Акуна Матата",
                gameId: 2,
                userId: 3
            },
            {
                answer: "Акуна Матата",
                gameId: 2,
                userId: 4
            },

        ]

        try {
            // questions.map(async q => await questionService.create(q.title, q.answer, q.complicity))
            // users.map(async q => await userService.createUser(q.name))
            // rooms.map(async q => await roomService.createRoom(q.host, q.mode))


            // users.map(async q => await userService.putUserInRoom(q.id, 1))
            //
            // games.map(async q => await gameService.create(q.roomId, q.questionId))


            answers.map(async q => await answerService.set(q.answer, q.gameId, q.userId))

            return res.json({status: "Ok"})
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new MockController()