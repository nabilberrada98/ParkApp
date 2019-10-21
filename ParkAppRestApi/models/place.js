const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PlaceSchema = mongoose.Schema({
    description: String,
    disponibilite: JSON,
    numero: String,
    etage: Number,
    vehicule: {
        type: JSON,
        required: true,
        default : ["Citadine"]
    },
    parking: {
        type: Schema.Types.ObjectId,
        ref: "parking"
    },
});

PlaceSchema.virtual('images',{
    ref : 'image',
    localField : '_id',
    foreignField : 'place'
});

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
//     Place.create({
//                 description : "une nouvelle place ensoleillé",
//                 numero : "K220",
//                 etage : 0,
//                 vehicule : ["Citadine"],
//                 parking : "5d9d01efc9d5141f30ec2c5a"
//             });
//     console.log('Place is created!');
// });
