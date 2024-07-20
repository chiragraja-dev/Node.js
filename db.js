// const mongoose = require('mongoose')
// require('dotenv').config()

// // const URL = process.env.DB_URL
// const URL = "mongodb://localhost:27017/hotels"
// const mongoUrl = URL
// // mongodb + srv://chirag:chirag123@hotels.ywwbymn.mongodb.net/
// mongoose.connect(mongoUrl, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })

// const db = mongoose.connection;

// db.on('connected', () => { console.log("-----------------------db connected") })
// db.on('disconnected', () => { console.log("**********************Not connected") })
// db.on('connected', () => { console.log("connected") })

// module.exports = db

const mongoose = require('mongoose');
require('dotenv').config();

// const URL = process.env.DB_URL
const URL = "mongodb://localhost:27017/hotels"
const mongoUrl = URL
// mongodb + srv://chirag:chirag123@hotels.ywwbymn.mongodb.net/
// const URL = process.env.DB_URL || "mongodb://localhost:27017/hotels";

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("-----------------------db connected");
}).catch((error) => {
    console.error("**********************Error connecting to DB:", error.message);
});

const db = mongoose.connection;

db.on('disconnected', () => {
    console.log("**********************Not connected");
});

module.exports = db;
