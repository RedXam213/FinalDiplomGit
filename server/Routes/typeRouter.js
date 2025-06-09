const Router = require('express')
const router = new Router()
const middwareRole = require('../middleware/RolesMiddleware')
const typeController = require('../controllers/typeController')

router.post('/', middwareRole('ADMIN'), typeController.create)
router.get('/', typeController.getAll)
router.delete('/:id', middwareRole('ADMIN'), typeController.delete)

module.exports = router
