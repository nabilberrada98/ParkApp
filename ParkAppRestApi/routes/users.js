const router = require("express-promise-router")();

const UsersController = require("../controllers/users.js");
const upload = require("../config/upload");

//const { validateParam, schemas } = require("../helpers/routeHelpers");

router
    .get("/",  UsersController.index)
    .post("/", UsersController.storeUser)
    .post("/avatar", upload.single("file"), UsersController.avatar);

router
    .get("/:userId", UsersController.getUser)
    .put("/:userId", UsersController.editUser)
    .patch("/:userId", UsersController.editUser);


module.exports = router;