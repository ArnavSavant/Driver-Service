const express = require("express");
const router = express.Router();
const { driverMiddleware, authMiddleware } = require("../../middlewares");
const { driverController } = require("../../controllers");
const carRoutes = require("./car-routes");

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

router.patch(
	"/toggle",
	authMiddleware.isAuthenticated,
	driverController.toggleAvailabilty
);

router.use("/car", carRoutes);

module.exports = router;
