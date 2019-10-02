const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RegionSchema = mongoose.Schema({
    nom: String,
    villes: [{
        type: Schema.Types.ObjectId,
        ref: "ville"
    }]
});


let Region = module.exports = mongoose.model('region', RegionSchema);

// Region.createCollection().then(function(collection) {
//     console.log('Region is created!');
// });
