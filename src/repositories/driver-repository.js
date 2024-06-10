const CrudRepository = require("./crud-repository");

const { Driver } = require("../models");

class DriverRepository extends CrudRepository {
	constructor() {
		super(Driver);
	}

	async getDriverByEmail(email) {
		try {
			const driver = await Driver.findOne({
				where: {
					email: email,
				},
			});
			return driver;
		} catch (error) {
			throw error;
		}
	}

	async addCar(carInfoId, driverId) {
		try {
			const driver = await Driver.update(
				{
					carInfoId: carInfoId,
				},
				{
					where: {
						id: driverId,
					},
				}
			);
			return driver;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = DriverRepository;
