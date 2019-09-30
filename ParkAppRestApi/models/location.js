const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LocationSchema = mongoose.Schema({
    prix: Number,
    status: Boolean,
    type: String,
    user : {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    place: {
        type: Schema.Types.ObjectId,
        ref: "Place"
    }
});


let Location = module.exports = mongoose.model('Location', LocationSchema);

// Location.createCollection().then(function(collection) {
//     console.log('Location is created!');
// });

