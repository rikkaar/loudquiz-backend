const {User} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const tokenService = require('../service/tokenService')
class UserService {
    async createUser(name) {
        const user = await User.create({name})
        const token = tokenService.generateAccessToken({
            id: user.id,
            name,
            roomId: user.roomId
        })
        return {token, user}
    }

    async getUser(id) {
        const user = await User.findByPk(id)
        if (!user) {
            throw ApiError.internal("User does not exist")
        }
        return user
    }

    async putUserInRoom(userId, room) {
        const user = await User.findOne({where: {id: userId}})
        if (!user) {
            throw ApiError.internal("User does not exist")
        }
        return await user.update({roomId: room})
    }

    async findUserRoom(userId) {
        const user = await User.findOne({wheer: {id: userId}})
        if (!user) {
            throw ApiError.internal("User does not exist")
        }
        return user.roomId
    }

    async changeName(id, name) {
        let user = await User.findOne({where: {id}})
        if (!user) {
            throw ApiError.internal("User does not exist")
        }
        if (user.name === name) {
            throw ApiError.internal("Новое имя должно отличаться от старого")
        }

        user = await user.update({name})
        const token = tokenService.generateAccessToken({
            id: user.id,
            name
        })
        return {token, user}
    }
}

module.exports = new UserService()