const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ReservationSchema = mongoose.Schema({
    startTime: Date,
    endTime: Date,
    prix: Number,
    locataire : {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    place: {
        type: Schema.Types.ObjectId,
        ref: "place"
    }
});


let Reservation = module.exports = mongoose.model('Reservation', ReservationSchema);

// Reservation.createCollection().then(function(collection) {
//     console.log('Reservation is created!');
// });

