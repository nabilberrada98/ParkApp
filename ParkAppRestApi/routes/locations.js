const router = require("express-promise-router")();
const locationsFiles = require("../config/upload");

const LocationsController = require("../controllers/locations");

router
    .get("/", LocationsController.index)
    .post("/", locationsFiles.array('file'), LocationsController.store);

router
    .get("/:locId", LocationsController.getById)
    .delete("/:locId", LocationsController.destory)


module.exports = router;