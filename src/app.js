const express = require('express');
const port = process.env.PORT;
const students =  require('./routers/student')
const users =  require('./routers/user')
var jwt = require('jsonwebtoken');
require('./db/db')
const app = express();

app.use(express.json())


// public route
app.use('/users', users);

// private route
app.use('/students', validateUser, students);

// user validation
function validateUser(req, res, next) {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.JWT_KEY)
        if(!data) {
            throw new Error()
        }
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }
}

// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handle errors
app.use(function (err, req, res, next) {
    console.log(err);

    if (err.status === 404)
        res.status(404).json({ message: "Not found" });
    else
        res.status(500).json({ message: "Something looks wrong :( !!!" });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
