const Router = require('express')
const router = new Router()
const middwareRole = require('../middleware/RolesMiddleware')
const brandController = require('../controllers/brandController')


router.post('/', middwareRole('ADMIN'),brandController.create)
router.get('/', brandController.getAll)
router.delete('/:id', middwareRole('ADMIN'), brandController.delete)
router.get("/byType", brandController.getByType);

module.exports = router
