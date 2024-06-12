"use strict";
const { Model, where } = require("sequelize");
const ENUM = require("../utils/common/enum");
const { UBER_GO, PREMIUM, LUXURY } = ENUM.RIDE_TYPE;
const bcrypt = require("bcrypt");
const { serverConfig } = require("../config");
module.exports = (sequelize, DataTypes) => {
	class Driver extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.hasOne(models.CarInfo, {
				foreignKey: "driverId",
				onDelete: "CASCADE",
			});
		}
	}
	Driver.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
			},
			contact: {
				type: DataTypes.INTEGER,
				unique: true,
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			isAvailable: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			rideType: {
				type: DataTypes.ENUM,
				values: [UBER_GO, PREMIUM, LUXURY],
				defaultValue: UBER_GO,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Driver",
		}
	);
	Driver.beforeCreate(function encrypt(driver) {
		const salt = bcrypt.genSaltSync(serverConfig.SALT_ROUNDS);
		const encryptedPassword = bcrypt.hashSync(driver.password, salt);
		driver.password = encryptedPassword;
	});
	return Driver;
};
