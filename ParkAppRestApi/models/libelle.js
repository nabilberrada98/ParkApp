const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LibelleSchema = mongoose.Schema({
    libelle: String,
    user: [{
        type: Schema.Types.ObjectId,
        ref: "user"
    }],
    loc: [{
        type: Schema.Types.ObjectId,
        ref: "localisation"
    }]
});


let Libelle = module.exports = mongoose.model('libelle', LibelleSchema);

// Libelle.createCollection().then(function(collection) {
//     console.log('Libelle is created!');
// });
