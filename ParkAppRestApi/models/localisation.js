const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LocalisationSchema = mongoose.Schema({
    address: String,
    lat: String,
    lng: String,
    ville: {
        type: Schema.Types.ObjectId,
        ref: "ville"
    },
});

LocalisationSchema.virtual('libelles',{
    ref : 'libelle',
    localField : '_id',
    foreignField : 'loc',
    justOne: true
});


let Localisation = module.exports = mongoose.model('localisation', LocalisationSchema);

// Localisation.createCollection().then(function(collection) {
//     console.log('localisation is created!');
// });
