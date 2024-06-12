"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class CarInfo extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.Driver, {
				foreignKey: "driverId",
				as: "Driver",
				allowNull: false,
			});
		}
	}
	CarInfo.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			number: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			isInsured: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
			model: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					min: 2000,
					max: 2024,
				},
			},
			selfOwned: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
			driverId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				unique: true,
			},
		},
		{
			sequelize,
			modelName: "CarInfo",
		}
	);
	return CarInfo;
};
