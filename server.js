const express = require("express")
const app = express()
const db = require('./db')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
require('dotenv').config()
const passport = require('./auth')
const PORT = process.env.PORT


const logRequest = (req, res, next) => {
    console.log(`request made to ${req.originalUrl} time: [${new Date().toLocaleString()}]`)
    next()
}

app.use(logRequest)
app.use(passport.initialize())

const authMiddle = passport.authenticate('local', { session: false })
app.get('/', authMiddle, function (req, res) {
    console.log("getting the api data for the /")
    res.send("getting the api data for the first api")
})
const personRoutes = require('./routes/personsRoutes')
app.use('/', personRoutes)

app.listen(PORT)