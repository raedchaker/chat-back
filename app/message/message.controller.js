const Message = require('./message.model');
const router = require('express').Router();
const auth = require('../middlewares/auth')

router.post('/send',auth, async (req, res) => {
    
    const message = await Message.create({sender: req.user.id, content: req.body.content, room: req.body.room});
    if( message){
        console.log(message);
    }


})


router.get('/room/:id',auth, async (req, res) => {
    const messages = await Message.find({room: req.params.id});
    if(messages){
        res.send(messages);
    }
})



module.exports = router