const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

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
    },
    password: {
        type: String,
        require: true,
    }

})

personSchema.pre('save', async function (next) {
    const person = this
    if (!person.isModified('password')) { return next() }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(person.password, salt)
        person.password = hashPassword;
        next()
    } catch (error) {
        return next(error)
    }
})

personSchema.methods.comparePassword = async function (pass) {
    try {
        const isMatch = await bcrypt.compare(pass, this.password);
        return isMatch;
    } catch (error) {
        throw err
    }
}

const Persons = mongoose.model('Persons', personSchema);
module.exports = Persons;