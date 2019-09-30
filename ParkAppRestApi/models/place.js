const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PlaceSchema = mongoose.Schema({
    description: String,
    disponibilite: JSON,
    numero: Number,
    etage: Number,
    vehicule: {
        type: Schema.Types.ObjectId,
        ref: "Vehiculesupporte"
    },
    parking: {
        type: Schema.Types.ObjectId,
        ref: "Parking"
    }
});

PlaceSchema.virtual('images',{
    ref : 'Image',
    localField : '_id',
    foreignField : 'place'
});

PlaceSchema.virtual('reservations',{
    ref : 'Reservation',
    localField : '_id',
    foreignField : 'place'
});

PlaceSchema.virtual('locations',{
    ref : 'Location',
    localField : '_id',
    foreignField : 'place'
});

let Place = module.exports = mongoose.model('Place', PlaceSchema);

// Place.createCollection().then(function(collection) {
//     console.log('Place is created!');
// });
