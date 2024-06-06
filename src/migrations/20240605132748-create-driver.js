"use strict";
const ENUM = require("../utils/common/enum");
const { UBER_GO, PREMIUM, LUXURY } = ENUM.RIDE_TYPE;
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Drivers", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING,
				unique: true,
				allowNull: false,
			},
			contact: {
				type: Sequelize.INTEGER,
				unique: true,
				allowNull: false,
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			isAvailable: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			rideType: {
				type: Sequelize.ENUM,
				values: [UBER_GO, PREMIUM, LUXURY],
				defaultValue: UBER_GO,
				allowNull: false,
			},
			carInfoId: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: "CarInfos",
					key: "id",
				},
				onDelete: "cascade",
				onUpdate: "cascade",
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Drivers");
	},
};
