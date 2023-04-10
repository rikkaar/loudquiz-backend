const sequelize = require('../database')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Room = sequelize.define('room', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    access_code: {type: DataTypes.STRING, allowNull: false},
    socket: {type: DataTypes.STRING, allowNull: false},
    mode: {type: DataTypes.STRING, allowNull: false},
    order: {type: DataTypes.ARRAY(DataTypes.INTEGER), allowNull: false},
})

const Questions = sequelize.define('questions', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    complicity: {type: DataTypes.INTEGER, allowNull: false},
    title: {type: DataTypes.STRING, allowNull: false},
    answer: {type: DataTypes.STRING, allowNull: true}
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

Room.hasMany(Game)
Game.belongsTo(Room)

Questions.hasMany(Game)
Game.belongsTo(Questions)

Game.hasMany(Answers)
Answers.belongsTo(Game)

User.hasMany(Answers)
Answers.belongsTo(User)


module.exports = {
    User,
    Room
}