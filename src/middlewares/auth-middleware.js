const { StatusCodes } = require("http-status-codes");
const { authService } = require("../services");
const AppError = require("../utils/errors/app-error");
const { ErrorResponse } = require("../utils/common");

async function isAuthenticated(req, res, next) {
	const accessToken = req.headers["x-access-token"];
	let driver = await authService.checkAuthentication(accessToken);
	if (!driver) {
		const refreshToken = req.cookies["x-refresh-token"];
		if (!refreshToken) {
			throw new AppError("Refresh TOken Not FOund", StatusCodes.BAD_REQUEST);
		}
		try {
			const newAccessToken = await authService.reAuthenticate(refreshToken);
			driver = await authService.checkAuthentication(newAccessToken);
			if (!driver) {
				throw new AppError(
					"Something went wrong while authentication",
					StatusCodes.INTERNAL_SERVER_ERROR
				);
			}
			if (newAccessToken) {
				req.token = {
					message: "Previos Token Expired. New Token Generated",
					newAccessToken: newAccessToken,
				};
			}
		} catch (error) {
			if (error instanceof AppError) {
				ErrorResponse.error = error;
				return res.status(error.statusCode).json(ErrorResponse);
			} else {
				ErrorResponse.error = new AppError(
					"Something went wrong while authentication",
					StatusCodes.INTERNAL_SERVER_ERROR
				);
				return res
					.status(StatusCodes.INTERNAL_SERVER_ERROR)
					.json(ErrorResponse);
			}
		}
	}
	req.driver = driver;
	next();
}

module.exports = {
	isAuthenticated,
};
