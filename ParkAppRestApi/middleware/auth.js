const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require("../models/user");


const authJwt = async (req, res, next) => {
	const token = req.headers['x-access-token'];
	if(!token){
		return res.status(498).send({ 
			status: 498, 
			error: "Refresh token has expired" 
		});
	}
	const decoded = jwt.verify(token, config.secret);
	const user = await User.findOne({_id : decoded.id, 'tokens.token':token})
	if(!user){
		return res.status(498).send({ 
			status: 498, 
			error: "Refresh token has expired" 
		});
	}
	req.user=user;
	req.token=token;
	next();
}


module.exports = authJwt;