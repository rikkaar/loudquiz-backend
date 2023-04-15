const ApiError = require('../error/ApiError')
const userService = require('../service/userSevice')
const roomService = require('../service/roomService')
const {User} = require("../models/models");
const consts = require("../utils/complicityConsts");


class RoomController {
    async getRoom(req, res, next) { // Получить комнату со всеми параметрами (Настройки, хост, порядок игроков)
        const {roomId} = req.params
        if (!roomId) {
            return next(ApiError.badRequest("Необходимо указать id комнаты"))
        }
        try {
            const result = await roomService.getRoom(roomId)
            return res.json(result)
        } catch (e) {
            next(e)
        }
    }

    async getRoomBySocket(req, res, next) { // Получить комнату со всеми параметрами (Настройки, хост, порядок игроков)
        const {socket} = req.params
        if (!socket) {
            return next(ApiError.badRequest("Отсутствует socket"))
        }
        try {
            const result = await roomService.getRoomBySocket(socket)
            return res.json(result)
        } catch (e) {
            next(e)
        }
    }

    async getRoomByCode(req, res, next) { // Получить комнату со всеми параметрами (Настройки, хост, порядок игроков)
        const {code} = req.params
        if (!code) {
            return next(ApiError.badRequest("Необходимо указать код подключения"))
        }
        try {
            const result = await roomService.getRoomByCode(code)
            return res.json(result)
        } catch (e) {
            next(e)
        }
    }

    async createRoom(req, res, next) { // Создать комнату, определить хост (права на редактирование), Код подключения и код WS-сессии
        try {
            const result = await roomService.createRoom(req.user.id)

            return res.json(result)
        } catch (e) {
            next(e)
        }
    }

    async deleteRoom(req, res, next) { // Удалить комнату и все связанные данные
        // const {roomId} = req.params

        try {
            // const result = await roomService.deleteRoom(roomId, req.user.id)
            const result = await roomService.deleteRoom(req.user.id)
            console.log(result)
            return res.json(result)
        } catch (e) {
            next(e)
        }
    }

    async setComplicity(req, res, next) { // Изменить сложность
        let {roomId, complicity} = req.params
        // const {complicity} = req.query //userId потом получаем из cookie
        complicity = Number(complicity)

        if (!Object.values(consts).includes(complicity)){
            return next(ApiError.badRequest(`${complicity} :такой сложности не существует`))
        }

        try {
            const result = await roomService.setComplicity(roomId, complicity)
            return res.json(result)
        } catch (e) {
            next(e)
        }
    }

    async setExperimental(req, res, next) { // Изменить эксперементальный режим
        const {roomId, experimental} = req.params
        // const {experimental} = req.query //userId потом получаем из cookie
        if (experimental !== '0' && experimental !== '1'){
            return next(ApiError.badRequest(`${experimental} : нужно указать либо 1, либо 0`))
        }
        try {
            const result = await roomService.setExperimental(roomId, experimental)
            return res.json(result)
        } catch (e) {
            next(e)
        }
    }

    async setLoudQuiz(req, res, next) { // Изменить Вхождение вопросов из Шоу
        const {roomId, loud_quiz} = req.params
        // const {experimental} = req.query //userId потом получаем из cookie
        if (loud_quiz !== '0' && loud_quiz !== '1'){
            return next(ApiError.badRequest(`${loud_quiz} : нужно указать либо 1, либо 0`))
        }
        try {
            const result = await roomService.setLoudQuiz(roomId, loud_quiz)
            return res.json(result)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new RoomController()