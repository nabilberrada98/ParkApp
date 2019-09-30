const router = require("express-promise-router")();

const PlacesController = require("../controllers/places");
const upload = require("../config/upload");

//const { validateParam, schemas } = require("../helpers/routeHelpers");

router
    .get("/", PlacesController.index)
    .post("/", upload.array('file'), PlacesController.storePlace)

router
    .get("/:placeId", PlacesController.getPlace)
    .put("/:placeId", PlacesController.editPlace)
    .patch("/:placeId", PlacesController.editPlace)


module.exports = router;