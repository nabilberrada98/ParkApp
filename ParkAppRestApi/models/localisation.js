const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LocalisationSchema = mongoose.Schema({
    lat: Number,
    lng: Number,
    ville: {
        type: Schema.Types.ObjectId,
        ref: "ville"
    },
    libelle: {
        type: Schema.Types.ObjectId,
        ref: "libelle"
    }
});


LocalisationSchema.virtual('libelles',{
    ref : 'libelle',
    localField : '_id',
    foreignField : 'loc',
    justOne: true
});


let Localisation = module.exports = mongoose.model('localisation', LocalisationSchema);

// Localisation.createCollection().then(function(collection) {
//     Localisation.create({
//         "lat" : 5.000001,
//         "lng" : 40,
//     });
//     console.log('localisation is created!');
// });