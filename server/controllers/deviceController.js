const uuid = require("uuid");
const path = require("path");
const { Device, DeviceInfo, Brand } = require("../models/models");
const ApiError = require("../error/apiError");
const { title } = require("process");
const { Op } = require("sequelize");

class deviceController {
  async create(req, res, next) {
    try {
      let { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        info,
        img: fileName,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) =>
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          })
        );
      }

      return res.json(device);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { brandId, typeId, limit, page, name, minPrice, maxPrice, sortOrder } = req.query;
    page = page || 1;
    limit = limit || 8;
    let offset = page * limit - limit;

    const where = {};

    if (typeId) where.typeId = typeId;

    if (brandId) {
      const brandIds = brandId.split(",").map((id) => Number(id));
      if (brandIds.length > 0) {
        where.brandId = { [Op.in]: brandIds };
      }
    }

    if (name) {
      where.name = { [Op.iLike]: `%${name}%` }
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price[Op.gte] = parseInt(minPrice);
      if (maxPrice) where.price[Op.lte] = parseInt(maxPrice);
    }

    const order = [];
    if (sortOrder === "asc") {
      order.push(["price", "ASC"])
    } else if (sortOrder === "desc") {
      order.push(["price", "DESC"])
    } else if (sortOrder === "newest") {
      order.push(["createdAt", "DESC"])
    }
    const devices = await Device.findAndCountAll({
      where,
      limit,
      offset,
      order
    });
    return res.json(devices);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: "info" }],
    });

    return res.json(device);
  }

  async check(req, res) {
    res.send({ message: "ALL WORKING!" });
  }

  async delete(req, res) {
    const { id } = req.params;
    const deleted = await Device.destroy({ where: { id } });

    if (deleted) {
      return res.json({ message: "Пристрій видалено" });
    } else {
      return ApiError.badRequest("Пристрій не знайдено");
    }
  }
}

module.exports = new deviceController();

/*
devices = await Device.findAndCountAll({
      where,
      limit,
      offset,
      include: [{ model: Brand }], // !неверный вывод устройств на девайсах именно из за него! ! почему то на него завязан поиск, мб из за вывода нейма бренда при поиске устройства
    });


*/
