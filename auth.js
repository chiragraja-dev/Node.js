const Persons = require('./models/persons')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
    try {
        const user = await Persons.findOne({ email: email })
        if (!user) {
            return done(null, false, { message: "user not found" })
        }
        const passMatch = await user.comparePassword(password)
        if (passMatch) {
            return done(null, user, { message: "login successfully" })
        } else {
            return done(null, false, { message: "Incorrect password" })
        }
    } catch (error) {
        return done(error)
    }
}))

module.exports = passport