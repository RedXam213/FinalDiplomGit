const Router = require("express");
const router = new Router();
const basketController = require("../controllers/basketController");
const authorizationMiddleware = require("../middleware/AuthenticationMiddleware");

router.post("/", authorizationMiddleware, basketController.addDevice);

router.get("/", authorizationMiddleware, basketController.getBasket);

router.put(
  "/:basketDeviceId",
  authorizationMiddleware,
  basketController.updateQuantity
);

router.delete(
  "/:basketDeviceId",
  authorizationMiddleware,
  basketController.removeDevice
);

module.exports = router;
