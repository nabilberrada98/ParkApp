const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require("../models/user");


const authJwt = async (req, res, next) => {
	const token = req.headers['x-access-token'];
	const users = req.session.users;

	if(typeof users === "undefined"){
		return res.status(498).send({ 
			status: 498, 
			error: "Refresh token has expired" 
		}); 
	}

	if(users && users[0] !== null){

		let userId = jwt.decode(token, config.secret).id;
        
		const userExist = users.some((u) => {
			return u._id === userId && u.token === token;
		});
		
		if(userExist){
			const user = users.filter( (u) => u._id === userId)[0];
			req.user = user;
			req.token = token;
		}else{
			return res.status(498).send({ 
				status: 498, 
				error: "Refresh token has expired" 
			}); 			
		}
		
	}else{
		return res.status(500).send({ 
			status: 500, 
			error: "Refresh token has expired" 
		}); 
	}

	if(!token){
		return res.status(498).send({ 
			status: 498, 
			error: "Refresh token has expired" 
		});
	}

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err){
			return res.status(500).send({ 
				auth: false, 
				message: 'Echec Authentication. Error -> ' + err 
			});
		}
		req.userId = decoded.id;
		next();
	});
}


module.exports = authJwt;