const { Brand, Device } = require("../models/models");
const { Op } = require("sequelize");

class brandController {
  async create(req, res) {
    const { name } = req.body;
    const brand = await Brand.create({ name });
    return res.json(brand);
  }

  async getAll(req, res) {
    const brands = await Brand.findAll();
    return res.json(brands);
  }

  async getByType(req, res) {
    const { typeId } = req.query;

    if (!typeId) {
      return res.status(400).json({ message: "Type ID не вказано" });
    }

    const brands = await Brand.findAll({
      include: [
        {
          model: Device,
          where: { typeId: Number(typeId) },
          attributes: [],
        },
      ],
      group: ["brand.id"],
    });

    return res.json(brands);
  }

  async check(req, res) {
    res.send({ message: "ALL WORKING!" });
  }

  async delete(req, res) {
    const { id } = req.params;
    const deleted = await Brand.destroy({ where: { id } });

    if (deleted) {
      return res.json({ message: "Бренд видалено" });
    } else {
      return ApiError.badRequest("Бренд не знайдено");
    }
  }
}

module.exports = new brandController();
