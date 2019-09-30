const User = require("../models/user");
const Role = require("../models/role");
const jwt = require('jsonwebtoken');

module.exports = {

    index: async (req, res, next) => {
        const users = await User.find({});
        res.status(200).json(users);
    },

    storeUser: async (req, res, next) => {
        const newUser = new User(req.body);
        
        let roleName = String(req.body.role);
        const role = await Role.find({name: roleName});
        
        if(role.length === 1){
            newUser.role = role[0];
            const user = await newUser.save();
            res.status(201).json(user);
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
        const token = jwt.decode(req.headers["x-access-token"], 8);
        let userId = +token.id;
        const url = "http://localhost:3000/users/" + file.filename;
        await User.findByIdAndUpdate(userId, { avatar: url })
        res.status(200).json("test");
    }


}