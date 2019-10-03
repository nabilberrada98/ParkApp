const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PlaceSchema = mongoose.Schema({
    description: String,
    disponibilite: JSON,
    numero: Number,
    etage: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    vehicule: {
        type: JSON,
        required: true,
    },
    parking: {
        type: Schema.Types.ObjectId,
        ref: "parking"
    }
});

PlaceSchema.virtual('images',{
    ref : 'image',
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
//     console.log('Place is created!');
// });
