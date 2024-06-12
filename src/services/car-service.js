const { StatusCodes } = require("http-status-codes");
const { CarInfoRepository, DriverRepository } = require("../repositories");
const carRepository = new CarInfoRepository();
const driverRepository = new DriverRepository();
const AppError = require("../utils/errors/app-error");

async function addCarDetails(data) {
	try {
		const car = await carRepository.create(data);
		return car;
	} catch (error) {
		let explanation = [];
		if (
			error.name == "SequelizeValidationError" ||
			error.name == "SequelizeUniqueConstraintError"
		) {
			error.errors.forEach((err) => {
				explanation.push(err.message);
			});
			throw new AppError(explanation.join(", "), StatusCodes.BAD_REQUEST);
		}
		console.log(error);
		throw new AppError("Cannot add the car", StatusCodes.INTERNAL_SERVER_ERROR);
	}
}

async function modifyCarDetails(data) {
	try {
		let car = await carRepository.getCarByDriverId(data.driverId);
		await carRepository.update(data, car.id);
		car = await carRepository.getCarByDriverId(data.driverId);
		return car;
	} catch (error) {
		let explanation = [];
		if (
			error.name == "SequelizeValidationError" ||
			error.name == "SequelizeUniqueConstraintError"
		) {
			error.errors.forEach((err) => {
				explanation.push(err.message);
			});
			throw new AppError(explanation.join(", "), StatusCodes.BAD_REQUEST);
		}
		console.log(error);
		throw new AppError(
			"Cannot Modify the car",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

module.exports = {
	addCarDetails,
	modifyCarDetails,
};
