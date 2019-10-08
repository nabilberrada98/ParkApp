const Reservation = require("../models/reservation");
const User = require("../models/user");
const Place = require("../models/place");

module.exports = {

    index: async (req, res, next) => {
        const Reservations = await Reservation.find({});
        res.status(200).json(Reservations);
    },

    store: async (req, res, next) => {
        const { places, userId } = req.body;
        const resv = await Reservation(req.body);
        const user = await User.findById(userId);
        const arr = [];

        resv.user = user;

        places.forEach( async (placeId) => {
            if(placeId){
                const place = await Place.findById(placeId);
                arr.push(place);
            }
        });

        if(arr.length >= 1){
            resv.places = arr;
        }

        res.status(200).json(resv);      
    },

    edit: async (req, res, next) => {
        const { resvId } = req.params;
        const resv = await Reservation.findById(resvId);
        res.status(200).json(resv);
    },

    destroy: async (req, res, next) => {
        const { resvId } = req.params;
        const resv = await Reservation.findByIdAndDelete(resvId);
        res.status(200).json(resv);
    },

    

};