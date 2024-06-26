"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("CarInfos", {
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
			number: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			isInsured: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
			model: {
				type: Sequelize.INTEGER,
				allowNull: false,
				validate: {
					min: 2000,
					max: 2024,
				},
			},
			selfOwned: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
			driverId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "Drivers",
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
		await queryInterface.dropTable("CarInfos");
	},
};
