const router = require("express-promise-router")();

const AuthController = require("../controllers/auth");

router
    .post("/login", AuthController.login)
    .get("/logout", AuthController.logout);
    //.get("/access-token", authJwt, AuthController.accessToken);


module.exports = router;