const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')
const middwareRole = require('../middleware/RolesMiddleware')

router.post('/',  middwareRole('ADMIN'),  deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)
router.delete('/:id', middwareRole('ADMIN'), deviceController.delete)


module.exports = router
