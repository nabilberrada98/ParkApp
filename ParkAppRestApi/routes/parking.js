const router = require("express-promise-router")();

const LocalsController = require("../controllers/parkings");

router
    .get("/", LocalsController.index)
    .post("/", LocalsController.store)

router
    .get("/:parkId", LocalsController.getById)
    .put("/:parkId", LocalsController.destory);


module.exports = router;