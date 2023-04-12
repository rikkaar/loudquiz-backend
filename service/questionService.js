const {Questions} = require('../models/models')
const ApiError = require('../error/ApiError')
const {Op, Sequelize} = require("sequelize");

class QuestionService {
    async get(id) {
        return await Questions.findOne({where: {id}})
    }

    async create(title, answer, complicity) {
        return await Questions.create({title, answer, complicity})
    }


    async getRandom(complicity, experimental, loud_quiz, prevGames) {
        console.log(prevGames[0].dataValues.id)
        if (complicity === 0) {
            if (experimental) {
                if (loud_quiz) {
                    return Questions.findAll({
                        where: {
                            id: {
                                [Op.notIn]: prevGames.map(item => item.dataValues.questionId),
                            }
                        }
                    })
                } else {
                    return Questions.findAll({
                        where: {
                            loud_quiz: {
                                [Op.is]: false
                            },
                            id: {
                                [Op.notIn]: prevGames.map(item => item.dataValues.id),
                            }
                        },
                        limit: 1,
                        order: [
                            [Sequelize.fn('RANDOM')]
                        ]
                    })
                }
            } else {
                if (loud_quiz) {
                    return Questions.findAll({
                        where: {
                            answer: {
                                [Op.not]: null
                            },
                            id: {
                                [Op.notIn]: prevGames.map(item => item.dataValues.questionId),
                            }
                        },
                        limit: 1,
                        order: [
                            [Sequelize.fn('RANDOM')]
                        ]
                    })
                } else {
                    return Questions.findAll({
                        where: {
                            answer: {
                                [Op.not]: null
                            },
                            loud_quiz: {
                                [Op.is]: false
                            },
                            id: {
                                [Op.notIn]: prevGames.map(item => item.dataValues.questionId),
                            }
                        },
                        limit: 1,
                        order: [
                            [Sequelize.fn('RANDOM')]
                        ]
                    })
                }
            }
        } else {
            if (experimental) {
                if (loud_quiz) {
                    return Questions.findAll({
                        where: {
                            complicity,
                            id: {
                                [Op.notIn]: prevGames.map(item => item.dataValues.questionId),
                            }
                        },
                        limit: 1,
                        order: [
                            [Sequelize.fn('RANDOM')]
                        ]
                    })
                } else {
                    return Questions.findAll({
                        where: {
                            complicity,
                            loud_quiz: {
                                [Op.is]: false
                            },
                            id: {
                                [Op.notIn]: prevGames.map(item => item.dataValues.questionId),
                            }
                        },
                        limit: 1,
                        order: [
                            [Sequelize.fn('RANDOM')]
                        ]
                    })
                }
            } else {
                if (loud_quiz) {
                    return Questions.findAll({
                        where: {
                            complicity,
                            answer: {
                                [Op.not]: null
                            },
                            id: {
                                [Op.notIn]: prevGames.map(item => item.dataValues.questionId),
                            }
                        },
                        limit: 1,
                        order: [
                            [Sequelize.fn('RANDOM')]
                        ]
                    })
                } else {
                    return Questions.findAll({
                        where: {
                            complicity,
                            answer: {
                                [Op.not]: null
                            },
                            loud_quiz: {
                                [Op.is]: false
                            },
                            id: {
                                [Op.notIn]: prevGames.map(item => item.dataValues.questionId),
                            }
                        },
                        limit: 1,
                        order: [
                            [Sequelize.fn('RANDOM')]
                        ]
                    })
                }
            }
        }
    }

}

module.exports = new QuestionService()