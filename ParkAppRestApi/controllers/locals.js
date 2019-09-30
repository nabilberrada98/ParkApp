const Parking = require("../models/parking");
const Localisation = require("../models/localisation");
const Ville = require("../models/ville");
const Region = require("../models/region");


module.exports = {

    index: async (req, res, next) => {
        const parkings = await Parking.find({});
        res.status(200).json(parkings);
    },

    store: async (req, res, next) => {
        const parking = new Parking(req.body);

    },

}