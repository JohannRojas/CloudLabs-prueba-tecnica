const loginCtrl = {}

const passport = require('passport')

const Register = require('../models/Register')

loginCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup')
}

loginCtrl.signup = async(req, res) => {
    const errors = []
    const { nombre, email, password, confirm_password } = req.body
    const isEmail = (str) => {
        const pattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
        return str.match(pattern)
    }
    if (password != confirm_password) {
        errors.push({ text: 'Password no coincide' })
    }
    if (password.length < 4) {
        errors.push({ text: 'Password demasiado corta' })
    }
    if (!isEmail(email)) {
        errors.push({ text: 'Debes ingresar un Email valido' })
    }
    if (errors.length > 0) {
        res.render('users/signup', {
            errors,
            nombre,
            email
        })
    } else {
        const emailUser = await Register.findOne({ email: email })
        if (emailUser) {
            req.flash('error_msg', 'El correo ya esta en uso')
            res.redirect('/users/signup')
        } else {
            const newUser = new Register({
                nombre,
                email,
                password
            })
            newUser.password = await newUser.encryptPassword(password)
            await newUser.save()
            req.flash('success_msg', 'Te haz registrado correctamente')
            res.redirect('/users/signin')
        }
    }

}

loginCtrl.renderSigninForm = (req, res) => {
    res.render('users/signin')
}

loginCtrl.signin = passport.authenticate('local', {
    failureRedirect: '/users/signin',
    successRedirect: '/users',
    failureFlash: true
})

loginCtrl.logout = (req, res) => {
    req.logout()
    req.flash('success_msg', 'Haz salido de la sesion')
    res.redirect('/users/signin')
}

module.exports = loginCtrl