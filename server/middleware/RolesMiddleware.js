const ApiError = require('../error/apiError')
const jwt = require('jsonwebtoken') 

module.exports = function (role) {
    return function (req,res,next) {
    
    if(req.method === "OPTIONS") {
        next() 
    }

    try {
        const jwtToken = req.headers.authorization.split(' ')[1]
        if(!jwtToken) {
            return next(ApiError.unauthorized('Не авторизований'))
        }
        const uncoded = jwt.verify(jwtToken, process.env.SECRET_JWT)
        if(uncoded.role !== role) {
            next(ApiError.unauthorized('Нема доступу'))
        }
        req.user = uncoded
        next()
    } catch(err) {
        next(ApiError.unauthorized('Не авторизований'))
    }
 }
}


