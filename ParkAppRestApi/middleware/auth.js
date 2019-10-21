const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require("../models/user");


const authJwt = async (req, res, next) => {
	const token = req.headers['x-access-token'];
	if(!token){
		return res.status(500).send({ 
			status: 500, 
			message: "Please Entre the access token" 
		});
	}

	try{
		const decoded = jwt.verify(token, config.secret);
		const user = await User.findOne({_id : decoded.id, 'tokens.token':token});
		req.user=user;
		req.token=token;
		next();
	}catch(TokenExpiredError){
		return res.status(498).send({ 
			status: 498, 
			message: "TOKEN_EXPIRED" 
		});
	}

}


module.exports = authJwt;