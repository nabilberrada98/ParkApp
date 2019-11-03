const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PlaceSchema = mongoose.Schema({
    description: String,
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
    localisation:{
        type: Schema.Types.ObjectId,
        ref: "localisation"
    }
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
//                 numero : "K1",
//                 etage : 0,
//                 type : 0,
//                 vehicules : [ 
//                     0, 
//                     1
//                 ],
//                 isInParking : true,
//                 isCameraEquiped : true,
//                 heureOuvertureParking : "06:00h",
//                 heureFermetureParking : "23:00h",
//                 localisation: "5dbd96802d80a619bbd2521a",
//                 images : [ 
//                     "assets/places/place1.jpeg", 
//                     "assets/places/place2.jpg"
//                 ],
//             });
//     console.log('Place is created!');
// });
