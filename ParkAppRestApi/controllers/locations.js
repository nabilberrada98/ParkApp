const Locations = require("../models/location");

module.exports = {

    index: async (req, res, next) => {
        const locationslist = await Locations.find({}).populate({ 
            path: 'place',
            populate: {
              path: 'parking',
              model: 'parking'
            } 
         }).exec();
        //locationslist.populate('place').exec();
        res.status(200).json(locationslist);
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
        const user = await Locations.findByIdAndUpdate(locId, req.body, { message: "user has been edited successfully !!"});
        res.status(200).send(user);  
    },

    destory: async (req, res, next) => {
        const { locId } = req.params;
        await Locations.findByIdAndDelete(locId);
        res.status(200).send({message: "the Location, has been deleted successfully"});
    }

}