const passport = require('passport');
const LocalStrategy = require('passport-local')

const Register = require('../models/Register');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async(email, password, done) => {

    //Existe correo
    const user = await Register.findOne({ email })
    if (!user) {
        return done(null, false, { message: 'No se encontro usuario registrado' })
    } else {
        //Coincide contrseña
        const match = await user.matchPassword(password)
        if (match) {
            return done(null, user)
        } else {
            return done(null, false, { message: 'Contraseña incorrecta' })
        }
    }

}))


passport.serializeUser((user, done) => {
    done(null, user.id)
})


passport.deserializeUser((id, done) => {
    Register.findById(id, (err, user) => {
        done(err, user)
    })
})