const router = require("express-promise-router")();

const AuthController = require("../controllers/auth");
const authJwt = require("../helpers/verifyJwtToken");

router
    .post("/login", AuthController.login)
    .get("/logout", AuthController.logout)
    .get("/access-token", [ authJwt.verifyToken ], AuthController.accessToken);


module.exports = router;