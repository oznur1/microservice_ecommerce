const express = require("express");
const orderController = require("./order.controller");


const router = express.Router();

router.post("/", orderController.createOrder);

router.get("/:orderId", orderController.getOrder);

router.get("/user/:userId",  orderController.getUserOrders);

router.patch("/:orderId/status", orderController.updateOrderStatus);

module.exports = router;