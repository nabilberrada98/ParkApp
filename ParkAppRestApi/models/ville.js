const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let VilleSchema = mongoose.Schema({
    nom: String,
    region: {
        type: Schema.Types.ObjectId,
        ref: "Region"
    }
});


let Ville = mongoose.model('Ville', VilleSchema);

// Ville.createCollection().then(function(collection) {
//     console.log('Ville is created!');
// });


module.exports = Ville;