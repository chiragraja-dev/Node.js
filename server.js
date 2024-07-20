const express = require("express")
const app = express()
const db = require('./db')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
require('dotenv').config()
const passport = require('./auth')
const personRoutes = require('./routes/personsRoutes')
const menuRoutes = require('./routes/menuRoutes')
// const PORT = process.env.PORT
const PORT = 3000

const swaggerSetup = require('./swagger');

swaggerSetup(app);

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

app.use('/', personRoutes)
app.use('/menu', menuRoutes)

app.listen(PORT)