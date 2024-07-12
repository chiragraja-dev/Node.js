const express = require("express")
const app = express()
const db = require('./db')
const Persons = require('./models/persons')
const bodyParser = require('body-parser')
app.use(bodyParser.json())


app.get('/', function (req, res) {
    console.log("getting the api data for the /")
    res.send("getting the api data for the first api")
})


const personRoutes = require('./routes/personsRoutes')
app.use('/', personRoutes)

app.listen(3000)