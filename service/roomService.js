const {Room, User} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const getAccessCode = require('../utils/getAccessCode')

class RoomService {
    async getRoom(roomId){
        return await Room.findOne({where: {id: roomId}})
    }

    async getRoomBySocket(socket){
        return await Room.findOne({where: {socket}})
    }

    async getRoomByCode(code) {
        return await Room.findOne({where: {access_code: code}})
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

    async createRoom(host) {
        const access_code = await getAccessCode()
        const socket = uuid.v4()
        const order = [host]
        return await Room.create({access_code, socket, order, host})
    }

    async deleteRoom(userId) {
        const room = await Room.findOne({
            where: {
                host: userId,
            }
        })
        if (!room) {
            return ApiError.unauthorized("У вас нет активных комнат")
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