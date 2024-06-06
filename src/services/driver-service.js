const { StatusCodes } = require("http-status-codes");
const { DriverRepository } = require("../repositories");
const driverRepository = new DriverRepository();
const AppError = require("../utils/errors/app-error");
async function registerDriver(data) {
	try {
		const driver = await driverRepository.create(data);
		return driver;
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
			"Cannot register the driver",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

async function login(data) {
	try {
		const driver = await driverRepository.get(data);
		
	} catch (error) {}
}
module.exports = {
	registerDriver,
};
