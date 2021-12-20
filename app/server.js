const app = require('./index');
const config = require('./config');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://raed:raed@cluster0.slfnz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const server = require('http').createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
});

const { addUser, removeUser, getUser, getUserInRoom } = require('./users')

io.on("connection", (socket) => {
    console.log("new connection")

    socket.on("join", ({ username, room }) => {
        const { error, user } = addUser({ id: socket.id, username, room })
        if (error) {
            return cb(error)
        }
        socket.join(user.room)
        socket.emit("message", {content: "welcome "+ user.username})
        socket.broadcast.to(user.room).emit("message", user.username+" has joined the room")

        io.to(user.room).emit("roomData", {
            room: user.room,
            users: getUserInRoom(user.room)
        })
    })

    socket.on("sendMessage", (msg) => {
        const user = getUser(socket.id)
        io.to(user.room).emit("message", {user: user.username, content: msg})
    })

    socket.on("disconnect", () => {
        const user = removeUser(socket.id)
        if (user) {
            io.to(user.room).emit("message", user.username+" has left")

            io.to(user.room).emit("roomData", {
                room: user.room,
                users: getUserInRoom(user.room)
            })
        }

    })
})

    server.listen(3000);
