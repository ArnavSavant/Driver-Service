const express = require("express");
const router = express.Router();
const { driverMiddleware, authMiddleware } = require("../../middlewares");
const { driverController, carController } = require("../../controllers");

router.post(
	"/add",
	authMiddleware.isAuthenticated,
	carController.addCarDetails
);

router.put(
	"/modify",
	authMiddleware.isAuthenticated,
	carController.modifyCarDetails
);

module.exports = router;
