const Parking = require("../models/parking");
const Localisation = require("../models/localisation");
const Ville = require("../models/ville");
const Region = require("../models/region");


module.exports = {

    index: async (req, res, next) => {
        const parkings = await Parking.find({});
        res.status(200).json(parkings);
    },

    getById: async (req, res, next) => {
        const { parkId } = req.params;
        const park = await Parking.findById(parkId);
        res.status(200).json(park);
    },

    store: async (req, res, next) => {
        const newPark = new Parking(req.body);
        const park = await newPark.save();
        res.status(201).send(park);
    },

    destory: async (req, res, next) => {
        const { parkId } = req.params;
        await Parking.findByIdAndDelete(parkId);
        res.status(200).send({message: "the Parking, has been deleted successfully"});
    }

}