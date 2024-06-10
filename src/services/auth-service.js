const { StatusCodes } = require("http-status-codes");
const { DriverRepository } = require("../repositories");
const driverRepository = new DriverRepository();
const AppError = require("../utils/errors/app-error");
const { Auth } = require("../utils/common");

async function checkAuthentication(accessToken) {
	try {
		if (!accessToken) {
			throw new AppError("JWT Token missing", StatusCodes.BAD_REQUEST);
		}
		const decode = await Auth.verifyAccessToken(accessToken);
		if (!decode) {
			throw new AppError(
				"Access Token Verification Failed",
				StatusCodes.BAD_REQUEST
			);
		}
		const expiration = await Auth.isExpired(decode);
		if (expiration) {
			throw new AppError(
				"Access Token is Expired",
				StatusCodes.GATEWAY_TIMEOUT
			);
		}
		const driver = await driverRepository.get(decode.id);
		return { id: driver.id, name: driver.name };
	} catch (error) {
		if (error instanceof AppError) {
			throw error;
		}
		throw new AppError(
			"Something went wrong while authentication",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

module.exports = {
	checkAuthentication,
};
