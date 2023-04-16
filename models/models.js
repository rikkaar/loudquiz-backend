const sequelize = require('../database')
const {DataTypes} = require('sequelize')
const {normal} = require("../utils/complicityConsts");

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull:false}
})

const Room = sequelize.define('room', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    access_code: {type: DataTypes.SMALLINT, allowNull: false},
    socket: {type: DataTypes.STRING, allowNull: false},
    order: {type: DataTypes.ARRAY(DataTypes.INTEGER), allowNull: false}, // Если роль Ведущего переходящая, то массив содержит всех пользователей, если нет, то только одного - ведущего
    complicity: {type: DataTypes.SMALLINT, allowNull: false, defaultValue: normal},
    experimental: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    loud_quiz: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true}
})

const Questions = sequelize.define('questions', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    complicity: {type: DataTypes.SMALLINT, allowNull: false},
    title: {type: DataTypes.STRING, allowNull: false},
    answer: {type: DataTypes.STRING, allowNull: true},
    loud_quiz: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
})

const Game = sequelize.define('game', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    status: {type: DataTypes.BOOLEAN, allowNull: true},
})

const Answers = sequelize.define('answers', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    answer: {type: DataTypes.STRING, allowNull: false}
})

const Feedback = sequelize.define('feedback', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    type: {type: DataTypes.SMALLINT, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: true}
})


User.hasOne(Room, {
    foreignKey: 'host'
})
Room.belongsTo(User, {
    foreignKey: 'host'
})

Room.hasOne(User)
User.belongsTo(Room)

Room.hasMany(Game, {
    onDelete: 'CASCADE',
})
Game.belongsTo(Room)

Questions.hasMany(Game)
Game.belongsTo(Questions)

Game.hasMany(Answers, {
    onDelete: 'CASCADE',
})
Answers.belongsTo(Game)

User.hasMany(Answers, {
    onDelete: 'CASCADE',
})
Answers.belongsTo(User)


module.exports = {
    User,
    Room,
    Questions,
    Game,
    Answers,
    Feedback,
}