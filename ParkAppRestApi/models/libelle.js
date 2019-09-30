const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LibelleSchema = mongoose.Schema({
    libelle: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    localisation : {
        type: Schema.Types.ObjectId,
        ref: "Localisation"
    }
});

let Libelle = module.exports = mongoose.model('Libelle', LibelleSchema);

// Libelle.createCollection().then(function(collection) {
//     console.log('Libelle is created!');
// });
