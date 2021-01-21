const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    id: {
        type: String,
        required: false
    },
    usuario: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    owner: {
        type: String,
        required: true
    }
})

module.exports = model('User', UserSchema)