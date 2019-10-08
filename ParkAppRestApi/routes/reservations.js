const router = require("express-promise-router")();

const ResvController = require("../controllers/reservations");

//const { validateParam, schemas } = require("../helpers/routeHelpers");

router
    .get("/", ResvController.index)
    .post("/", ResvController.store)



module.exports = router;