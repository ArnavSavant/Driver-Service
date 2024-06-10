const dotenv = require("dotenv");

dotenv.config();

module.exports = {
	PORT: parseInt(process.env.PORT),
	SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS),
	ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
	REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
	ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
	REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,
};
