const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { serverConfig } = require("../../config");
async function checkPassword(plainPassword, encryptedPassword) {
	try {
		return bcrypt.compareSync(plainPassword, encryptedPassword);
	} catch (error) {
		console.log(error);
		throw error;
	}
}

async function createAccessToken(payload) {
	try {
		const accessToken = jwt.sign(payload, serverConfig.ACCESS_TOKEN_SECRET, {
			expiresIn: serverConfig.ACCESS_TOKEN_EXPIRY,
		});
		return accessToken;
	} catch (error) {
		throw error;
	}
}

async function createRefreshToken(payload) {
	try {
		const refreshToken = jwt.sign(payload, serverConfig.REFRESH_TOKEN_SECRET, {
			expiresIn: serverConfig.REFRESH_TOKEN_EXPIRY,
		});
		return refreshToken;
	} catch (error) {
		throw error;
	}
}

async function verifyAccessToken(token) {
	try {
		return jwt.verify(token, serverConfig.ACCESS_TOKEN_SECRET, {
			ignoreExpiration: true,
		});
	} catch (error) {
		throw error;
	}
}

async function verifyRefreshToken(token) {
	try {
		return jwt.verify(token, serverConfig.REFRESH_TOKEN_SECRET, {
			ignoreExpiration: true,
		});
	} catch (error) {
		console.log(error);
		throw error;
	}
}
async function isExpired(decode) {
	try {
		const currTime = Math.floor(Date.now() / 1000);
		if (decode.exp && decode.exp < currTime) {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		throw error;
	}
}

module.exports = {
	checkPassword,
	createAccessToken,
	createRefreshToken,
	verifyAccessToken,
	verifyRefreshToken,
	isExpired,
};
