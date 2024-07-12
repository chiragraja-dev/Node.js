const mongoose = require('mongoose')

// const mongoUrl = "mongodb://localhost:27017/hotels"
const mongoUrl = "mongodb+srv://chirag:chirag123@hotels.ywwbymn.mongodb.net/"
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