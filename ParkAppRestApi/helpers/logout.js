const jwt = require("jsonwebtoken");
const config = require("../config/config");

var logout = function(){};

/**
 * logging out user.
 * @Function
 * @param req
 * @param res
 * @param callback
 */
logout.prototype.logoutUser = function(req, res, callback){
    const users = req.session.users;
    let userId = jwt.decode(req.headers['x-access-token'], config.secret).id;
    if(Array.isArray(users) && users.length && users[0]._id !== null){
        
        const index = users.findIndex((u) => u._id === userId);
        delete users[index];

        return callback(null, {'success': true, "message": "User logout successfully"});
    }
    callback(null, {'success': true, "message": "User logout successfully"});
}

module.exports = new logout();