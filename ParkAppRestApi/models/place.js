const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PlaceSchema = mongoose.Schema({
    description: String,
    disponibilite: JSON,
    numero: Number,
    etage: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    images: [{
        type: Schema.Types.ObjectId,
        ref: "image"
    }],
    vehicule: {
        type: Schema.Types.ObjectId,
        ref: "vehiculesupporte"
    },
    parking: {
        type: Schema.Types.ObjectId,
        ref: "parking"
    }

});

let Place = module.exports = mongoose.model('place', PlaceSchema);

// Place.createCollection().then(function(collection) {
//     console.log('Place is created!');
// });
