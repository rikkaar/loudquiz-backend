const ApiError = require('../error/ApiError')
const userService = require('../service/userSevice')
const roomService = require('../service/roomService')
const {User} = require("../models/models");
const consts = require("../utils/complicityConsts");


class RoomController {
    async getRoom(req, res, next) {
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

    async createRoom(req, res, next) {
        // const {userId} = req.cookies
        const {mode, userId} = req.query //userId потом получаем из cookie
        try {
            const result = await roomService.createRoom(userId, mode)
            return res.json(result)
        } catch (e) {
            next(e)
        }
    }

    async deleteRoom(req, res, next) {
        const {roomId} = req.params
        const {userId} = req.query //userId потом получаем из cookie

        try {
            const result = await roomService.deleteRoom(roomId, userId)
            return res.json(result)
        } catch (e) {
            next(e)
        }
    }

    async setComplicity(req, res, next) {
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

    async setExperimental(req, res, next) {
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

    async setLoudQuiz(req, res, next) {
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