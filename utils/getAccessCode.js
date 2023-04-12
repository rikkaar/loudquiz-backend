const {Room} = require('../models/models')
const roomService = require('../service/roomService')
const ApiError = require('../error/ApiError')

module.exports = async function getAccessCode() {
    let access_code = Math.floor(Math.random() * 8999) + 1000
    // console.log(await Room.findOne({where: {access_code}}))
    while (await Room.findOne({where: {access_code}})) {
        access_code = Math.floor(Math.random() * 8999) + 1000
    }
    return access_code
}

