const Reservation = require("../models/reservation");
const User = require("../models/user");
const Place = require("../models/place");

module.exports = {

    index: async (req, res, next) => {
        const Reservations = await Reservation.find({});
        res.status(200).json(Reservations);
    },

    store: async (req, res, next) => {
        const place = await Place.findById(req.body.placeId);
        const resv = await new Reservation({
            startTime : req.body.startDate,
            endTime : req.body.endDate,
            nbrJours : req.body.nbrJours,
            locataire : req.user,
            place : place
        });
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