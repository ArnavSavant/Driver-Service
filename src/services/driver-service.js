const { StatusCodes } = require("http-status-codes");
const { DriverRepository } = require("../repositories");
const driverRepository = new DriverRepository();
const AppError = require("../utils/errors/app-error");
const { Auth } = require("../utils/common");
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
		const driver = await driverRepository.getDriverByEmail(data.email);
		if (!driver) {
			throw new AppError(
				"Driver is not registered with following email address",
				StatusCodes.BAD_REQUEST
			);
		}
		const passwrordMatch = await Auth.checkPassword(
			data.password,
			driver.password
		);
		if (!passwrordMatch) {
			throw new AppError("Incorrect Password", StatusCodes.BAD_REQUEST);
		}
		const accessToken = await Auth.createAccessToken({
			id: driver.id,
			name: driver.name,
		});
		const refreshToken = await Auth.createRefreshToken({
			id: driver.id,
			name: driver.name,
		});
		return { accessToken, refreshToken };
	} catch (error) {
		if (error instanceof AppError) {
			throw error;
		}
		throw new AppError(
			"Something Went Wrong",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}
module.exports = {
	registerDriver,
	login,
};
