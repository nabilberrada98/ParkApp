const router = require("express-promise-router")();

const LocationsController = require("../controllers/locations");

router
    .get("/", LocationsController.index)
    .post("/", LocationsController.store);

router
    .get("/:locId", LocationsController.getById)
    .delete("/:locId", LocationsController.destory)


module.exports = router;