const express = require("express");
const router = express.Router();
const { driverMiddleware, authMiddleware } = require("../../middlewares");
const { driverController, carController } = require("../../controllers");

// api/v1/driver/register --> POST
router.post(
	"/register",
	driverMiddleware.validateRegistration,
	driverController.registerDriver
);

router.get(
	"/login",
	driverMiddleware.validateLoginRequest,
	driverController.login
);

router.post(
	"/car/add",
	authMiddleware.isAuthenticated,
	carController.addCarDetails
);

module.exports = router;
