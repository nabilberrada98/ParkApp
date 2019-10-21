const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let LocationSchema = mongoose.Schema({
    prix: Number,
    status: {
        type : Boolean,
        default : true
    },
    type: Number,
    locataire: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    place: {
        type: Schema.Types.ObjectId,
        ref: "place",
        required : true
    }
});


let Location = module.exports = mongoose.model('location', LocationSchema);

// Location.createCollection().then(function(collection) {
//     Location.create({
//         prix : 90,
//         status : true,
//         type : 0,
//         locataire : "5da0f52d319fd80ce0057fa9",
//         place : "5da76a033b026e1c3435663c"
//     })
//     console.log('Location is created!');
// });

