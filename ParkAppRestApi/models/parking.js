const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ParkingSchema = mongoose.Schema({
    heureFermeture: String,
    heureOuverture: String,
    intitule: String,
    places:[{
        type: Schema.Types.ObjectId,
        ref: "place"
    }],
    loc: {
        type: Schema.Types.ObjectId,
        ref: "localisation"
    }

});


let Parking = module.exports = mongoose.model('parking', ParkingSchema);

// Parking.createCollection().then(function(collection) {
//     console.log('Parking is created!');
// });
