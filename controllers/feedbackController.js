const ApiError = require('../error/ApiError')
const feedbackService = require('../service/feedbackService')


class FeedbackController {
    async get(req, res, next) {
        const {id} = req.params
        try {
            const result = await feedbackService.get(id)
            return res.json(result)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new FeedbackController()