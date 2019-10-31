const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PlaceSchema = mongoose.Schema({
    description: String,
    disponibilite: JSON,
    numero: String,
    etage: Number,
    type : Number,
    vehicules : [Number],
    isInParking : {
        type : Boolean,
        default : false
    },
    heureFermetureParking: String,
    heureOuvertureParking: String,
    isCameraEquiped : {
        type : Boolean,
        default : false
    },
    images : [String],
    localisation : {
        type: Schema.Types.ObjectId,
        ref: "localisation"
    }
});

// Place.statics.getLocation = async (placeId) => {
//     const location = { lat: String, lng: String, ville: String };
//     const place = await Place.findById(placeId);
//     location.lat = place.localisation.lat;
//     location.lng = place.localisation.lng;
//     location.ville = place.localisation.ville;
//     //console.log("Place ");
// };

PlaceSchema.virtual('locations',{
    ref : 'location',
    localField : '_id',
    foreignField : 'place'
});

PlaceSchema.virtual('reservations',{
    ref : 'reservation',
    localField : '_id',
    foreignField : 'place'
});

let Place = module.exports = mongoose.model('place', PlaceSchema);


// Place.createCollection().then(function(collection) {

//     Place.createIndexes( { localisation : "2dsphere" } );
    
// });
