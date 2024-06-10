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
		} catch (error) {}
	}
}

module.exports = DriverRepository;
