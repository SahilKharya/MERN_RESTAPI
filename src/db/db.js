const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err,client) => {
    if (err) return console.error(err)

    console.log("Connected to DataBase")
});

