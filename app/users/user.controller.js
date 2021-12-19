const User = require('./user.model');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const config = require("../config");
const auth = require('../middlewares/auth')

router.post('/sign-up', async (req, res) => {
    const password = await bcrypt.hash(req.body.password, saltRounds);
    var newUser = new User({
        username: req.body.username,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: password
    });
    newUser.save(function (err, user) {
        if (user) {
            res.status(200).json({ success: 'account created you can connect now' })
        }
        else
            res.status(400).send(err);
    })
})

router.post('/log-in', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
        await bcrypt.compare(req.body.password, user.password, (err, result)=>{
            if (result) {
                const token = jwt.sign(
                    { id: user._id, username: user.username },
                    config.TOKEN_KEY,
                    {
                      expiresIn: "2h",
                    }
                  );
                  // save user token
                  user.token = token;
                res.status(200).json({ success: 'welcome ' + user.username, user })
            }
            else {
                res.status(404).json({ error: 'wrong password' });
            }
        });
    }
    else {
        res.status(404).json({ error: 'user not found' })
    }
})

router.get('/',auth, (req, res) => {
    User.find(function (err, example) {
        if (err)
            res.send(err)
        res.json(example);
    });
})

router.put('/example/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.query, (err, example) => {
        if (err) throw err;
        res.json({ 'success': 'Updated successfully' })
    });
})

router.patch('/example/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.query, (err, example) => {
        if (err) throw err;
        res.json({ 'success': 'Updated successfully' })
    });
})


module.exports = router