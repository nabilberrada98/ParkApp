const Location = require("../models/location");

module.exports = {

    index: async (req, res, next) => {
        const locations = await Locations.find({});
        res.status(200).json(locations);
    },

    getById: async (req, res, next) => {
        const { locId } = req.params;
        const loc = await Locations.findById(locId);
        res.status(200).send(loc);
    },

    store: async (req, res, next) => {
        let userId = Number(req.user._id);
        let placeId = Number(req.body.placeId);
        const newLoc = new Location({ ...req.body, locataire: userId, place: placeId });
        const loc = await newLoc.save();
        res.status(201).send(loc);
    },

    edit: async (req, res, next) => {
        const { locId } = req.params;
        const user = await Location.findByIdAndUpdate(locId, req.body, { message: "user has been edited successfully !!"});
        res.status(200).send(user);  
    },

    destory: async (req, res, next) => {
        const { locId } = req.params;
        await Location.findByIdAndDelete(locId);
        res.status(200).send({message: "the Location, has been deleted successfully"});
    }

}