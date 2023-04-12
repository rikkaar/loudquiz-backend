const {Room, Game} = require('../models/models')
const roomService = require('../service/roomService')
const gameService = require('../service/gameService')
const ApiError = require('../error/ApiError')

module.exports = async function whoseTurn(roomId) {
    const orderList = await roomService.getOrderList(roomId)
    const turn = await gameService.getTurn(roomId)
    return orderList[(turn - 1) % orderList.length] // возвращаем id пользователя, который сейчас должен ходить. Перед тем как вызывать эту функцию, уже должна быть создана новая Игра (новый кон)
}

