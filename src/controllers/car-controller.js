const { StatusCodes } = require("http-status-codes");
const { carService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function addCarDetails(req, res) {
	try {
		const car = await carService.addCarDetails({
			name: req.body.name,
			number: req.body.number,
			isInsured: req.body.isInsured,
			model: req.body.model,
			selfOwned: req.body.selfOwned,
			driverId: req.driver.id,
		});
		SuccessResponse.messages = "Car's details added SuccessFully";
		SuccessResponse.data = { car: car, token: req.token || null };
		return res.status(StatusCodes.CREATED).json(SuccessResponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}
async function modifyCarDetails(req, res) {
	try {
		const car = await carService.modifyCarDetails({
			name: req.body.name,
			number: req.body.number,
			isInsured: req.body.isInsured,
			model: req.body.model,
			selfOwned: req.body.selfOwned,
			driverId: req.driver.id,
		});
		SuccessResponse.messages = "Car's details modified SuccessFully";
		SuccessResponse.data = { car: car, token: req.token || null };
		return res.status(StatusCodes.CREATED).json(SuccessResponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}

module.exports = {
	addCarDetails,
	modifyCarDetails,
};
