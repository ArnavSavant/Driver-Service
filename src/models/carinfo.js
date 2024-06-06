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
				foreignKey: "carInfoId",
				onDelete: "cascade",
			});
		}
	}
	CarInfo.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
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
		},
		{
			sequelize,
			modelName: "CarInfo",
		}
	);
	return CarInfo;
};
