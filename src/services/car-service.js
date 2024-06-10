const { StatusCodes } = require("http-status-codes");
const { CarInfoRepository, DriverRepository } = require("../repositories");
const carRepository = new CarInfoRepository();
const driverRepository = new DriverRepository();
const AppError = require("../utils/errors/app-error");

async function addCarDetails(data) {
	try {
		const carData = {
			name: data.name,
			number: data.number,
			isInsured: data.isInsured,
			model: data.model,
			selfOwned: data.selfOwned,
		};
		const driverId = data.driverId;
		const car = await carRepository.create(carData);
		const driver = await driverRepository.addCar(car.id, driverId);
		return { driver, car };
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

module.exports = {
	addCarDetails,
};
