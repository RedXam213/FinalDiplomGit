const ApiError = require('../error/apiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')

const generateJWT = (id,email,role) => {
    return jwt.sign( 
        {id, email, role}, process.env.SECRET_JWT, {expiresIn: '24h'} /*payload - середина токена*/
    ) 
}

class UserController { 
    async registration(req,res,next) { 
        const {email, password, role} = req.body
         if (!email || !password) {
            return next(ApiError.badRequest('incorrect email or password')) 
         }
         const candidate = await User.findOne({where: {email}})
         if (candidate) {
            return next(ApiError.badRequest('User already exists'))
         }
         
         const hashPassword = await bcrypt.hash(password, 10)
         const user = await User.create({email, role, password: hashPassword})
         
         const backet = await Basket.create({userId: user.id})
         
         const jwtToken = generateJWT(user.id, user.email, user.role)
         return res.json({jwtToken})
    }   
    
    async login(req,res,next) { 
        const {email, password} = req.body
        const user = await User.findOne({where:{email}})
        if(!user) {
            return next(ApiError.internal('User not defined'))
        }
        
        let overlapPassword = bcrypt.compareSync(password, user.password)
        
        if(!overlapPassword) {
            return next(ApiError.badRequest('incorrect password'))
        }

        const jwtToken = generateJWT(user.id, user.email, user.role) /*При возможности реализовать рефреш токена что бы не долбится в постоянную логинится*/
        return res.json({jwtToken}) 
    }
    /*
    async check(req, res, next) { 
        const { id } = req.query
        if (!id) {
            return next(ApiError.badRequest('Не задан id'))
        }
        res.json(id)
    }
    
   
    async check(req, res, next) { 
        res.json({message: "работает!!!"})
    }
    */
    
    async check(req, res, next) { 
        const jwtToken = generateJWT(req.user.id, req.user.email, req.user.role)
        res.json({jwtToken})
    }

    async delete(req, res) {
        const { id } = req.params
        const deleted = await User.destroy({where:{id}})

        if (deleted) {
            return res.json({message: 'Юзера видалено'})
        } else {
            return ApiError.badRequest('Юзера не знайдено')
        }

    }
}

module.exports = new UserController()

