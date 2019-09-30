const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ParkingSchema = mongoose.Schema({
    heureFermeture: String,
    heureOuverture: String,
    intitule: String,
    loc: {
        type: Schema.Types.ObjectId,
        ref: "Localisation"
    }
});

ParkingSchema.virtual('places',{
    ref : 'Place',
    localField : '_id',
    foreignField : 'parking'
});

let Parking = module.exports = mongoose.model('Parking', ParkingSchema);

// Parking.createCollection().then(function(collection) {
//     console.log('Parking is created!');
// });
