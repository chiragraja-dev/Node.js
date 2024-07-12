const mongoose = require('mongoose')


const personSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    work: {
        type: String,
        require: true,
        enum: ['manager', 'chefs', 'waiters']
    },
    age: {
        type: Number,
    },
    mobile: {
        type: Number,
        require: true,
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        require: true,
    }

})

// const Persons = mongoose.model('Persons', personeScema)
// exports.model = Persons

const Persons = mongoose.model('Persons', personSchema);
module.exports = Persons;