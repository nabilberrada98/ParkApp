const User = require("../models/user");
const Role = require("../models/role");
const config = require("../config/config");
const Auth = require('../controllers/auth');
var ObjectId = require('mongodb').ObjectID;
const Libelle = require("../models/libelle");


module.exports = {

    index: async (req, res, next) => {
        const users = await User.find({}).populate("role").exec();
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
        const { _id } = req.params;
        const user = await User.findById(_id);
        res.status(200).json(user);
    },

    editUser: async (req, res, next) => {
        console.log('here');
        console.log(req.params);
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
    },

    getAddressTxt: async (req, res) => {
        const users = await User.find({ role: ObjectId(req.params.roleId) });
        res.send(users);
    },

    getAllLocalisation: async (req, res, next) => {
        const { userId } = req.params;
        const loc = await Libelle.find({ user: ObjectId(userId) }, { address: "$address"}).populate({
            path: "loc",
            model: "localisation"
        });
        const data = [];
        
        // loc.forEach((val, i) => {
        //     if(val.address){
        //         data.push({ address: val.address})
        //     }
        // });

        res.send(loc);
    },

}