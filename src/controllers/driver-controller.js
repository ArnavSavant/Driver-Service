const { StatusCodes } = require("http-status-codes");
const { driverService } = require("../services");
const { response } = require("express");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function registerDriver(req, res) {
	try {
		const driver = await driverService.registerDriver({
			name: req.body.name,
			email: req.body.email,
			contact: req.body.contact,
			password: req.body.password,
			isAvailable: req.body.isAvailable,
			rideType: req.body.rideType,
		});
		SuccessResponse.messages = "Driver's details added SuccessFully";
		SuccessResponse.data = driver;
		return res.status(StatusCodes.CREATED).json(SuccessResponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}

async function login(req, res) {
	try {
		const tokens = await driverService.login({
			email: req.body.email,
			password: req.body.password,
		});
		SuccessResponse.messages = "Login SuccessFul";
		SuccessResponse.data = tokens.accessToken;
		res.cookie("x-refresh-token", tokens.refreshToken, { httpOnly: true });
		return res.status(StatusCodes.OK).json(SuccessResponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}

async function toggleAvailabilty(req, res) {
	try {
		const driver = await driverService.toggleAvailabilty(req.driver.id);
		SuccessResponse.messages = "Driver's Availability Toggled SuccessFully";
		SuccessResponse.data = driver;
		return res.status(StatusCodes.CREATED).json(SuccessResponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}

module.exports = {
	registerDriver,
	login,
	toggleAvailabilty,
};
