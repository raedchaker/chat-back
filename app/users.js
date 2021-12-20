const users = []
const newuser = []
const addUser = ({ id, username, room }) => {
    //vlidate data
    if (!username || !room) {
        return {
            error: 'Username and room are required!'
        }
    }
    //check for existing users
    const existingUser = users.find((user) => {
        return user.room == room && user.username == username
    })
    //store user
    const user = { id, username, room }
    users.push(user)
    console.log(users);
    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => {
        return user.id === id
    })
    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => {
    return users.find((user) => {
        return user.id === id
    })
}

const getUserInRoom = (room) => {
    const u = []
    users.filter((user) => {
        user.room === room
    })
    console.log(users)
    return users
}

module.exports = {
    addUser, removeUser, getUser, getUserInRoom
}