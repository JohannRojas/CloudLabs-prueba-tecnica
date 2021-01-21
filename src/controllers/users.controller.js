const usersCtrl = {}
const User = require('../models/User')

usersCtrl.renderUserForm = (req, res) => {
    res.render('users/new-user')
}

usersCtrl.createNewUser = async(req, res) => {
    const { usuario, nombre, apellido, email } = req.body

    const errors = []
    const emailUser = await User.findOne({ email: email })
    const nameUser = await User.findOne({ usuario: usuario })
    const isEmail = (str) => {
        const pattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
        return str.match(pattern)
    }

    if (usuario.length < 1) {
        errors.push({ text: 'Debes ingresar un Nombre de usuario valido' })
    }
    if (nombre.length < 1) {
        errors.push({ text: 'Debes ingresar un Nombre valido' })
    }
    if (email.length < 1 || !isEmail(email)) {
        errors.push({ text: 'Debes ingresar un Email valido' })
    }
    if (emailUser) {
        errors.push({ text: 'Email en uso' })
    }
    if (nameUser) {
        errors.push({ text: 'Nombre de usuario en uso' })
    }
    if (errors.length > 0) {
        res.render('users/new-user', {
            errors,
            usuario,
            nombre,
            apellido,
            email
        })
    } else {
        const newUser = new User({
            usuario,
            nombre,
            apellido,
            email
        })
        newUser.owner = req.user._id
        await newUser.save()
        req.flash('success_msg', 'Usuario agregado correctamente')
        res.redirect('/users')
    }
}

usersCtrl.renderUsers = async(req, res) => {
    const users = await User.find({ owner: req.user._id }).lean()
    res.render('users/all-users', { users })
}

usersCtrl.renderDetailUser = async(req, res) => {
    const user = await User.findById(req.params.id).lean()

    res.render('users/detail-user', { user })
}

usersCtrl.renderEditForm = async(req, res) => {
    const user = await User.findById(req.params.id).lean()

    res.render('users/edit-user', { user })
}

usersCtrl.updateUser = async(req, res) => {
    const { usuario, nombre, apellido, email } = req.body
    await User.findByIdAndUpdate(req.params.id, {
        usuario,
        nombre,
        apellido,
        email
    })
    req.flash('success_msg', 'Usuario actualizado')
    res.redirect('/users')
}

usersCtrl.modalDeleteUser = (req, res) => {
    swal("Hello world!");
}

usersCtrl.deleteUser = async(req, res) => {
    await User.findByIdAndDelete(req.params.id)
    req.flash('success_msg', 'Usuario eliminado')
    res.redirect('/users')
}
module.exports = usersCtrl