const express = require("express");
const router = express.Router();
const { driverMiddleware } = require("../../middlewares");
const { driverController } = require("../../controllers");

// api/v1/driver/register --> POST
router.post(
	"/register",
	driverMiddleware.validateRegistration,
	driverController.registerDriver
);

module.exports = router;