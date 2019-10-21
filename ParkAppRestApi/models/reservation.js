const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ReservationSchema = new Schema({
    startTime: Date,
    endTime: Date,
    locataire: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    place: {
        type: Schema.Types.ObjectId,
        ref: "place"
    }

});

ReservationSchema.virtual('places',{
    ref : 'place',
    localField : '_id',
    foreignField : 'reservation'
});


let Reservation = module.exports = mongoose.model('reservation', ReservationSchema);

// Reservation.createCollection().then(function(collection) {
//     console.log('Reservation is created!');
// });

