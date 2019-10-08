const mongoose = require('mongoose');

let ParkingSchema = mongoose.Schema({
    heureFermeture: String,
    heureOuverture: String,
    intitule: String
});

ParkingSchema.virtual('places',{
    ref : 'place',
    localField : '_id',
    foreignField : 'parking'
});

let Parking = module.exports = mongoose.model('parking', ParkingSchema);

// Parking.createCollection().then(function(collection) {
//     console.log('Parking is created!');
// });

