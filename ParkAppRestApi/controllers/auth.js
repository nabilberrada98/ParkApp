var jwt = require('jsonwebtoken');
const config = require("../config/config");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Role = require("../models/role");


module.exports = {

    login: async (req, res, next) => {
        const user = await User.findOne({ email: req.body.email });
        if(user === null) return res.status(501).send({ reason: 'Utilisateur introuvable.' });

        const role = await Role.findById(user.role);

        var passwordIsValid = await bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(501).send({ auth: false, accessToken: null, reason: 'Invalide Password!' });
        }

        var token = jwt.sign({ id: user.id, roleId: user.role, roleName: role.name }, config.secret, {
            expiresIn: 86400, // expires in 24 hours
        });
        
        user.tokens = user.tokens.concat({token});
        await user.save();
        res.status(200).send({
            token,
            auth: true,
            login: user,
            authorities: role.name
        });
    },

    logout: async (req, res, next) => {
        const logout = require('../helpers/logout');
        logout.logoutUser(req, res, function(err, data) {
            if (err) {
              res.json({ 'error': data.error, 'message': data.message });
            } else {
                res.json({ 'success': data.success, 'message': data.message });
            }
        });
    },

    accessToken: async (req, res, next) => {
        const currentUser = await User.findById(req.user.id);
        res.status(200).json(currentUser);
    }


}