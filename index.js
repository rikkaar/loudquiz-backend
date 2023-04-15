require('dotenv').config({path: "./.env.development"})
const path = require('path')
const express = require('express')
const http = require('http')
const sequelize = require('./database')
const models = require('./models/models')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const ErrorHandler = require('./middleware/ErrorHandlingMiddleware')
const AuthMiddleware = require('./middleware/AuthMiddleware')

const app = express()
const { Server } = require("socket.io");

const server = http.createServer(app)

const io = require("socket.io")(server, {
    cors: {
        origin: "http://127.0.0.1:5173",
        credentials: true,
        methods: ["POST", "GET"]
    }});


const router = require('./routes/index')

const PORT = process.env.PORT || 5000


app.use(express.json())
app.use(cors({
    credentials: true,
    origin: "http://127.0.0.1:5173"
}))
app.use(cookieParser())


// app.use(
//     session({
//         secret: process.env.COOKIE_SECRET,
//         credentials: true,
//         name: "sid",
//         resave: false,
//         saveUninitialized: false,
//         cookie: {
//             secure: process.env.ENVIRONMENT === "production" ? "true" : "auto",
//             httpOnly: true,
//             expires: 1000 * 60 * 60 * 24 * 7,
//             sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
//         },
//     })
// );

app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)
app.use(ErrorHandler)

// io.use((socket, next) => AuthMiddleware(socket.request, {}, next))
io.on("connection", socket => {
    console.log(socket.id)
    // console.log(socket.request.user.name)
})

const start = async () => {
    try {
        await sequelize.authenticate()
        // await sequelize.sync({force: true})
        await sequelize.sync()

        server.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e.message)
    }
}

start()