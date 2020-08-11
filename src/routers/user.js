const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth')
const router = express.Router()

router.get("/", (req, res) => {
    res.sendFile(process.env.Src_PATH+ '/index.html');
    // console.log(res);
});
router.get("/home", (req, res) => {
    res.sendFile(process.env.Src_PATH+ '/home.html');
    // console.log(res);
});
router.get("/signup", (req, res) => {
    res.sendFile(process.env.Src_PATH+ '/signup.html');
    // console.log(res);
});

router.post('/students', async(req, res) => {
    try{
        const user = new User(req.body);
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    }catch (error) {
        res.status(400).send(error)
    }
})

router.post('/students/login', async (req, res)=>{
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if(!user){
            return res.status(401).send({error: 'Login failed'})
        }
        const token = await user.generateAuthToken()
        res.send({user, token})
        res.redirect('/');
    }catch (error) {
        res.status(400).send(error)
    }
})

router.get('/students/me', auth, async(req, res) => {
    // View logged in user profile
    res.send(req.user)
    console.log(req.user.firstName)
})


module.exports = router