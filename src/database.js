const mongoose = require('mongoose')

const MONGODB_URI = `mongodb://localhost/crud-app`

mongoose.connect(MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(db => console.log('Connected'))
    .catch(err => console.log(err))