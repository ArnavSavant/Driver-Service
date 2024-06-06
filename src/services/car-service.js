const { StatusCodes } = require("http-status-codes");
const { CarInfoRepository, DriverRepository } = require("../repositories");
const carRepository = new CarInfoRepository();
const driverRepository = new DriverRepository();
const AppError = require("../utils/errors/app-error");


async function addCarDetails(data) {
	try {
		const car = await carRepository.create(data);
        // const 
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
		throw new AppError(
			"Cannot create a user",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

module.exports = {
	addCarDetails,
};
