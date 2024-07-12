const mongoose = require('mongoose')

const mongoUrl = "mongodb://localhost:27017/hotels"

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;

db.on('connected', () => { console.log("-----------------------db connected") })
db.on('disconnected', () => { console.log("**********************Not connected") })
// db.on('connected', () => { console.log("connected") })

module.exports = db