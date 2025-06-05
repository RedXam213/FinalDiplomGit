const { Basket, BasketDevice, Device } = require("../models/models");
const ApiError = require("../error/apiError");

class BasketController {
  
  async addDevice(req, res, next) {
    try {
      const { deviceId, quantity = 1 } = req.body;
      const userId = req.user.id;

      const basket = await Basket.findOne({ where: { userId } });
      if (!basket) {
        return next(ApiError.badRequest("Корзина не найдена"));
      }

      let basketDevice = await BasketDevice.findOne({
        where: { basketId: basket.id, deviceId },
      });

        basketDevice = await BasketDevice.create({
          basketId: basket.id,
          deviceId,
          quantity,
        });
      

      return res.json(basketDevice);
    } catch (error) {
      next(ApiError.internal("Помилка додавання у корзину"));
    }
  }

  async removeDevice(req, res, next) {
    try {
      const { basketDeviceId } = req.params;
      const basketDevice = await BasketDevice.findByPk(basketDeviceId);

      if (!basketDevice) {
        return next(ApiError.badRequest("Девайса корзини не знайдено"));
      }

      await basketDevice.destroy();
      return res.json();
    } catch (error) {
      next(ApiError.internal("Помилка видалення товару"));
    }
  }

  async getBasket(req, res, next) {
    try {
      const basket = await Basket.findOne({
        where: { userId: req.user.id },
        include: [
          {
            model: BasketDevice,
            include: [Device],
          },
        ],
      });

      if (!basket) {
        return next(ApiError.badRequest("Корзини нема"));
      }

      return res.json(basket.basket_devices);
    } catch (error) {
      next(ApiError.internal("Помилка отримання корзини"));
    }
  }

  async updateQuantity(req, res, next) {
    try {
      const { basketDeviceId } = req.params;
      const { quantity } = req.body;

      const basketDevice = await BasketDevice.findByPk(basketDeviceId);
      if (!basketDevice) {
        return next(ApiError.badRequest("Девайса корзини не знайдено"));
      }

      basketDevice.quantity = quantity;
      await basketDevice.save();

      return res.json(basketDevice);
    } catch (error) {
      next(ApiError.internal("Помилка оновлення"));
    }
  }
}

module.exports = new BasketController();
