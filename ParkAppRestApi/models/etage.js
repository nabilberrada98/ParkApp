const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let EtageSchema = new Schema({
    numero: Number,
    places: [{
        type: Schema.Types.ObjectId,
        ref: "place"
    }]
});


let Etage = module.exports = mongoose.model('etage', EtageSchema);

// Etage.createCollection().then(function(collection) {
//     console.log('Etage is created!');
// });

