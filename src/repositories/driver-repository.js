const CrudRepository = require("./crud-repository");

const { Driver } = require("../models");

class DriverRepository extends CrudRepository {
	constructor() {
		super(Driver);
	}
}

module.exports = DriverRepository;