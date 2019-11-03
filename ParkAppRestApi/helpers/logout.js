const jwt = require("jsonwebtoken");
const config = require("../config/config");
const User = require("../models/user");
var logout = function(){};

/**
 * logging out user.
 * @Function
 * @param req
 * @param res
 * @param callback
 */
logout.prototype.logoutUser = async function(req, res, callback){
    const token=req.headers['x-access-token'];
    let userId = jwt.decode(token, config.secret).id;
    const user = await User.findOne({_id : userId, 'tokens.token':token});
	if(!user){
		return res.status(498).send({ 
			status: 498, 
			error: "Refresh token has expired" 
		});
    }
    user.tokens = user.tokens.filter( (t) => t.token !== token);
    await user.save();
    callback(null, {'success': true, "message": "User logout successfully"});
}

module.exports = new logout();