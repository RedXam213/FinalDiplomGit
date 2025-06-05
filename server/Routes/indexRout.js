const Router = require('express')
const router = new Router()

const deviceRouter = require('./deviceRouter')
const typeRouter = require('./typeRouter')
const brandRouter = require('./brandRouter')
const basketRouter = require("./basketRouter");
const userRouter = require('./userRouter')


router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/basket', basketRouter);
router.use('/device', deviceRouter)




module.exports = router