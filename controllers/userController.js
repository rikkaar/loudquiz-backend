const ApiError = require('../error/ApiError')
const UserService = require('../service/userSevice')
const tokenService = require('../service/tokenService')

class UserController {
    async getUser(req, res, next) { //Получить всю публичную информацию о user'e
        const {id} = req.params
        try {
            const result = await UserService.getUser(id)
            return res.json(result)
        } catch (e) {
            next(e)
        }
    }

    async findUserRoom(req, res, next) {
        try {
            const result = await UserService.findUserRoom(req.user.id)
            return res.json(result)
        } catch (e) {
            next(e)
        }

    }

    async isAuth(req, res, next) { //Получить всю публичную информацию о user'e
        try {
            const result = await UserService.getUser(req.user.id)
            return res.json(result)
        } catch (e) {
            next(e)
        }

    }

    async createUser(req, res, next) { // Создание пользователя с Именем и id
        const {name} = req.params
        if (!req.headers.authorization?.split(" ")[1]) {
            return next(ApiError.unauthorized("UserUn   Authorized", "Пользователь не авторизован"))
        }
        try {
            let token = req.headers.authorization.split(" ")[1]
            if (token !== "null") {
                return ApiError.badRequest("Вы уже используете пользователя")
            }

            const result = await UserService.createUser(name)
            return res.json(result)
        } catch (e) {
            next(e)
        }
    }

    async changeName(req, res, next) { // Меняем имя созданного пользователя
        const {name} = req.params // Это временная мера, пока я не помещу userId в хедеры или куки

        try {
            const result = await UserService.changeName(req.user.id, name)
            return res.json(result)
        } catch (e) {
            next(e)
        }
    }

    async putUserInRoom(req, res, next) { // Поместить пользователя в комнату
        const {roomId} = req.params
        // const {userId} = req.cookies
        try {
            const result = await UserService.putUserInRoom(req.user.id, roomId)
            return res.json(result)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController()