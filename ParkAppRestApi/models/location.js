const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LocationSchema = mongoose.Schema({
    prix: Number,
    status: Boolean,
    type: String,
    locataire: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    place: {
        type: Schema.Types.ObjectId,
        ref: "place"
    }
});


let Location = module.exports = mongoose.model('location', LocationSchema);

// Location.createCollection().then(function(collection) {
//     console.log('Location is created!');
// });

