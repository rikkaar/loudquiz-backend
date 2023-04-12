const {Feedback} = require('../models/models')
const ApiError = require('../error/ApiError')

class FeedbackService {
    async get (id) {
        return await Feedback.findAll({where: {id}})
    }

}

module.exports = new FeedbackService()