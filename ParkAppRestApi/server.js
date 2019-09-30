const express = require('express');
var session = require('express-session');
const bodyParser = require('body-parser');
const pe = require('parse-error');
const cors = require('cors');
require("./config/connection");



const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());



var localsSession = function(req, res, next){ 
	res.locals.session = req.session;
	console.log("===============================");
	console.log("[Server] => Locals : ", res.locals.users);
	console.log("===============================");
  next(null, req, res);
}

app.use(localsSession);
app.use("/users", express.static("resources/static/assets/uploads/users"));
app.use("/places", express.static("resources/static/assets/uploads/places"));


//
const users = require("./routes/users");
const places = require("./routes/places");
const reservations = require("./routes/reservations");
const auth = require("./routes/auth");

const authJwt = require("./helpers/verifyJwtToken");

// Setup routes and handle errors
app.use('/api/users', [authJwt.verifyToken], users);
app.use("/api/places", [authJwt.verifyToken], places);
app.use("/api/reservations", [authJwt.verifyToken], reservations);
app.use("/api/auth", auth);


// Catch 404 and forward to errors handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  // Set locals, only providing error error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = app.get("port") || 3000;
app.listen(port, () => console.log(`server is listening on port :` + port) )


module.exports = app;

// Setup promise handler
process.on('unhandledRejection', err => {
  console.log('Uncaught Error', pe(err));
});

