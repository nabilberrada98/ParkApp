const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ImagesSchema = mongoose.Schema({
    path: String,
    place : {
        type: Schema.Types.ObjectId,
        ref: "Place"
    }
});


let Image = module.exports = mongoose.model('Image', ImagesSchema);

// Image.createCollection().then(function(collection) {
//     console.log('Image is created!');
// });
