const { StatusCodes } = require("http-status-codes");

async function isAuthenticated(req, res, next) {
	try {
		const accessToken = req.headers["x-access-token"];
        
	} catch (error) {}
}
