const {User} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')

class UserService {
    async createUser(name) {
        return await User.create({name})
    }

    async putUserInRoom(userId, room) {
        const user = await User.findOne({where: {id: userId}})
        if (!user) {
            throw ApiError.internal("User does not exist")
        }
        return await user.update({roomId: room})
    }
}

module.exports = new UserService()