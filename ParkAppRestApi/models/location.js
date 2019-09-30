const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LocationSchema = mongoose.Schema({
    prix: Number,
    status: Boolean,
    type: String,
    user: [{
        type: Schema.Types.ObjectId,
        ref: "user"
    }],
    place: [{
        type: Schema.Types.ObjectId,
        ref: "place"
    }]
});


let Location = module.exports = mongoose.model('location', LocationSchema);

// Location.createCollection().then(function(collection) {
//     console.log('Location is created!');
// });

