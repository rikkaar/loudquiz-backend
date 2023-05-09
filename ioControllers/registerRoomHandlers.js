module.exports = (io, socket) => {
    const connect = () => {
        // ...
    }
    const join = (roomSocket) => {
        socket.join(roomSocket)
        console.log(socket.rooms)
    }

    const deleteRoom = () => {

    }

    const getUsers = () => {
        // ...
    }

    const sendSettings = () => {

    }

    socket.on("room:connect", connect);
    socket.on("room:getUsers", getUsers);
    socket.on("room:join", join);
}