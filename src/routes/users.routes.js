const { Router } = require('express');
const { renderAbout } = require('../controllers/index.controller');
const router = Router()

const {
    renderUserForm,
    createNewUser,
    renderUsers,
    renderEditForm,
    updateUser,
    deleteUser,
    renderDetailUser
} = require('../controllers/users.controller')


const { isAuthenticated } = require('../helpers/auth')

//New user
router.get('/users/add', isAuthenticated, renderUserForm)

router.post('/users/new-user', isAuthenticated, createNewUser)

//Get all users
router.get('/users', isAuthenticated, renderUsers)

//Get user details
router.get('/users/detail/:id', isAuthenticated, renderDetailUser)

//Edit users
router.get('/users/edit/:id', isAuthenticated, renderEditForm)

router.put('/users/edit/:id', isAuthenticated, updateUser)

//Delete user

router.delete('/users/delete/:id', isAuthenticated, deleteUser)

module.exports = router