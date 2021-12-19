const Room = require('./room.model');
const router = require('express').Router();
const auth = require('../middlewares/auth')
var mongoose = require('mongoose');

router.post('/', auth, async (req, res) => {
    const newRoom = {
        label: req.body.label,
        owner: req.user.id,
        members: [req.user.id],
        active: true,
    }
    Room.create(newRoom, (err, room) => {
        if (err) {
            res.status(400).json({ error: 'error occured wile creating room' });
            return
        }
        res.status(200).send(room);
    });
});

// get list of the rooms that the user is a member in
router.get('/rooms', auth, (req, res) => {
    Room.find(function (err, rooms) {
        if (err)
            res.send(err)
        const myRooms = [];
        for (let i of rooms) {
            for (let j of i.members) {
                if (j.toString() === req.user.id) {
                    myRooms.push(i);
                    break;
                }
            }
        }
        res.send(myRooms);
    });
});

// get room by id
router.get('/:id', auth, (req, res) => {
    Room.findById(req.params.id, function (err, room) {
        if (err)
            res.send(err)
        for (let i of room.members) {
            if (i.toString() === req.user.id) {
                res.send(room);
                break;
            }
        }

    });
});

// update label
router.patch('/update/:id', auth, async (req, res) => {
    const room = await Room.findById(req.params.id);
    if (!room || !room.owner.toString() === req.user.id) {
        res.status(403).json({ error: 'you do not have the right to edit the room' });
    }
    if (req.body.label) {
        room.label = req.body.label;
        room.save()
    };
})
// add a member
router.patch('/addMember/:id', auth, async (req, res) => {
    const room = await Room.findById(req.params.id);
    if (!room || !room.owner.toString() === req.user.id) {
        res.status(403).json({ error: 'you do not have the right to edit the room' });
        return
    }
    room.members.push(req.body.id);
    room.save();
    console.log(room);
})


module.exports = router