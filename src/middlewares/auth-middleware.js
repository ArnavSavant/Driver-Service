const { StatusCodes } = require("http-status-codes");
const { authService } = require("../services");
async function isAuthenticated(req, res, next) {
	const accessToken = req.headers["x-access-token"];
	const driver = await authService.checkAuthentication(accessToken);
	if (driver) {
		req.driver = driver;
		next();
	}
}

module.exports = {
	isAuthenticated,
};
