const mongoose = require('mongoose')
require('dotenv').config()

const URL = process.env.DB_URL
// const mongoUrl = "mongodb://localhost:27017/hotels"
const mongoUrl = URL
// mongodb + srv://chirag:chirag123@hotels.ywwbymn.mongodb.net/
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;

db.on('connected', () => { console.log("-----------------------db connected") })
db.on('disconnected', () => { console.log("**********************Not connected") })
// db.on('connected', () => { console.log("connected") })

module.exports = db