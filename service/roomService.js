const {Room, User} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const getAccessCode = require('../utils/getAccessCode')

class RoomService {
    async getRoom(roomId){
        return await Room.findOne({where: {id: roomId}})
    }

    async userList(roomId) {
        return await User.findAll({where: {roomId}})
    }

    async getOrderList(roomId) { // возвращет массив idшников пользователей, которые сейчас играют
        return await User.findOne({
            attributes: ['order'],
            where: {id: roomId}
        })
    }

    async setOrderList(roomId, order) {
        const room = await Room.findOne({
            where: {id: roomId}
        })

        return await room.update({order})
    }

    async createRoom(host, mode) {
        const access_code = await getAccessCode()
        const socket = uuid.v4()
        const order = [host]
        return await Room.create({access_code, socket, mode, order, host})
    }

    async deleteRoom(roomId, userId) {
        const room = await Room.findOne({
            where: {
                host: userId,
                id: roomId,
            }
        })
        if (!room) {
            return ApiError.unauthorized("Пользователь не может удалить чужую комнату")

        }
        await room.destroy()
    }

    async setComplicity(roomId, complicity) {
        const room = await Room.findOne({
            where: {
                id: roomId,
            }
        })
        room.update({complicity})
    }

    async setExperimental(roomId, experimental) {
        const room = await Room.findOne({
            where: {
                id: roomId,
            }
        })
        room.update({experimental})
    }

    async setLoudQuiz(roomId, loud_quiz) {
        const room = await Room.findOne({
            where: {
                id: roomId,
            }
        })
        room.update({loud_quiz})
    }
}

module.exports = new RoomService()