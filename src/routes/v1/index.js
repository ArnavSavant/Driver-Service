const express = require("express");

const router = express.Router();

const { infoController } = require("../../controllers");
const driverRoutes = require("./driver-routes");

router.get("/info", infoController.info);
router.use("/driver", driverRoutes);

module.exports = router;
