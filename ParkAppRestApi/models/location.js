const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Place = require('./place');
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
//     Location.create({
//         prix : 90,
//         status : true,
//         type : 'Garage',
//         locataire : "5d9b2696d29ef119989c80a3",
//         place : "5d9d0237dc50b8138818f8d4"
//     })
//     console.log('Location is created!');
// });

