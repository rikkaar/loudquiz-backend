module.exports = (io, socket) => {
    const connect = () => {
        console.log(socket.id)
        console.log(socket.request.user.id)
    }

    socket.on("user:conn", connect);
}