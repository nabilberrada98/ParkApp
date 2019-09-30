const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ReservationSchema = mongoose.Schema({
    startTime: Date,
    endTime: Date,
    prix: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    places: [{
        type: Schema.Types.ObjectId,
        ref: "place"
    }]

});


let Reservation = module.exports = mongoose.model('reservation', ReservationSchema);

// Reservation.createCollection().then(function(collection) {
//     console.log('Reservation is created!');
// });

