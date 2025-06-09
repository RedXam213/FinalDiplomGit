const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authorizationMiddleware = require('../middleware/AuthenticationMiddleware')
const middwareRole = require('../middleware/RolesMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authorizationMiddleware, userController.check)
router.delete('/:id', middwareRole('ADMIN'), userController.delete)

module.exports = router