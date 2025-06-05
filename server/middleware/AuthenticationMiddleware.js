const ApiError = require('../error/apiError')
const jwt = require('jsonwebtoken') 

module.exports = function (req,res,next) {
    
    if(req.method === "OPTIONS") {
        next() 
    }
    try {
        const jwtToken = req.headers.authorization.split(' ')[1]
        if(!jwtToken) {
            return next(ApiError.unauthorized('Не авторизований'))
        }
        const uncoded = jwt.verify(jwtToken, process.env.SECRET_JWT)
        req.user = uncoded
        next()
    } catch(err) {
        next(ApiError.unauthorized('Не авторизований'))
    }
}