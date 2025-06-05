const { Type } = require('../models/models')
const ApiError = require('../error/apiError')

class typeController { 
    async create(req,res) { 
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }
    
    async getAll(req,res) { 
        const types = await Type.findAll()
        return res.json(types) 
    }
    
    async check(req, res) { 
        res.send({message:'ALL WORKING!'})
    }

    async delete(req, res) {
        const { id } = req.params
        const deleted = await Type.destroy({where:{id}})
        if (deleted) {
            return res.json({message: 'Type видалено'})
        } else {
            return ApiError.badRequest('Type не знайдено')
        }

    }

}

module.exports = new typeController()
