const CrudRepository = require("./crud-repository");

const { CarInfo } = require("../models");

class CarInfoRepository extends CrudRepository {
	constructor() {
		super(CarInfo);
	}
}

module.exports = CarInfoRepository;
