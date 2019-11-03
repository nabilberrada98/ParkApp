const router = require("express-promise-router")();

const UsersController = require("../controllers/users.js");
const upload = require("../config/upload");

//const { validateParam, schemas } = require("../helpers/routeHelpers");
const authJwt = require("../middleware/auth");
router
    .get("/",authJwt, UsersController.index)
    .post("/", UsersController.storeUser)
    .post("/avatar",authJwt,upload.single("file"), UsersController.avatar);

router
    .get("/:userId",authJwt, UsersController.getUser)
    .get("/locations/:roleId", UsersController.getAddressTxt)
    .get("/localisations/:userId", UsersController.getAllLocalisation)
    .put("/:userId", authJwt,UsersController.editUser)
    .patch("/:userId", authJwt,UsersController.editUser)
    .delete("/:userId", authJwt,UsersController.deleteUser);

module.exports = router;