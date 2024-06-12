const CrudRepository = require("./crud-repository");

const { CarInfo } = require("../models");
const { where } = require("sequelize");

class CarInfoRepository extends CrudRepository {
	constructor() {
		super(CarInfo);
	}

	async getCarByDriverId(driverId) {
		try {
			const car = await CarInfo.findOne({
				where: {
					driverId: driverId,
				},
			});
			return car;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = CarInfoRepository;
