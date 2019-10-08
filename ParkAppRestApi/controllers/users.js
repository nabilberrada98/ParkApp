const User = require("../models/user");
const Role = require("../models/role");
const config = require("../config/config");
const jwt = require('jsonwebtoken');
const Auth = require('../controllers/auth');
module.exports = {

    index: async (req, res, next) => {
        const users = await User.find({});
        res.status(200).json(users);
    },

    storeUser: async (req, res, next) => {
        const newUser = new User(req.body);
        let roleName = String(req.body.role).toLowerCase();
        const role = await Role.find({name: roleName})
        if(role.length === 1){
            newUser.role = role[0];
            await newUser.save();
            Auth.login(req,res,next);
        }else{
            res.status(404).json({success: false, message: `this role ( ${roleName} ) doesn't exists !!`});
        }
 
    },

    getUser: async (req, res, next) => {
        const { userId } = req.params;
        const user = await User.findById(userId);
        res.status(200).json(user);
    },

    editUser: async (req, res, next) => {
        const { userId } = req.params;
        const user = await User.findByIdAndUpdate(userId, req.body, {"message": "user has been edited successfully !!"});
        res.status(200).json(user);
    },

    deleteUser: async (req, res, next) => {
        const { userId } = req.params;
        const user = await User.findOneAndDelete(userId);
        res.status(200).json(user);
    },

    getRoles: async (req, res, next) => {
        const roles = await role.find({});
        res.status(200).json(roles);
    },

    avatar: async (req, res) => {
        const file = req.file;
        let userId = req.user._id;
        const url = config.host + ":" + config.port + "/users/" + file.filename;
        await User.findByIdAndUpdate(userId, { avatar: url })
        res.status(200).json("test");
    }


}