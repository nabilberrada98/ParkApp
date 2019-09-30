const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let VehiculeSupporteSchema = mongoose.Schema({
    libelle: String,
});


let VehiculeSupporte = module.exports = mongoose.model('vehiculesupporte', VehiculeSupporteSchema);

// VehiculeSupporte.createCollection().then(function(collection) {
//     console.log('VehiculeSupporte is created!');
// });
