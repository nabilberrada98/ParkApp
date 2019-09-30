const mongoose = require('mongoose');

let RegionSchema = mongoose.Schema({
    nom: String
});

RegionSchema.virtual('villes',{
    ref : 'Ville',
    localField : '_id',
    foreignField : 'region'
});


let Region = module.exports = mongoose.model('Region', RegionSchema);

// Region.createCollection().then(function(collection) {
//     console.log('Region is created!');
// });
