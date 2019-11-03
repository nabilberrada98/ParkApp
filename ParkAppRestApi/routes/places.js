const router = require("express-promise-router")();

const PlacesController = require("../controllers/places");

//const { validateParam, schemas } = require("../helpers/routeHelpers");

router
    .get("/", PlacesController.index)
    .get("/prix", PlacesController.getRangePrices)
    .get("/cities", PlacesController.getAllCities);

router
    .get("/:placeId", PlacesController.getPlace)
    .put("/:placeId", PlacesController.editPlace)
    .patch("/:placeId", PlacesController.editPlace)


module.exports = router;