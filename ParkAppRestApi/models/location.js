const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let LocationSchema = mongoose.Schema({
    prix: Number,
    status: {
        type : Boolean,
        default : true
    },
    joursLouable : [Number],
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
}, {  toJSON: { virtuals: true }, toObject: { virtuals: true } });

LocationSchema.methods.toJSON = function(){
    const location = this.toObject();
    delete location.place_details;
    delete location.locataire_details;
    return location;
}

LocationSchema.virtual('place_details',{
    ref : 'place',
    localField : 'place',
    foreignField : '_id',
    justOne:true
});

LocationSchema.virtual('locataire_details',{
    ref : 'user',
    localField : 'locataire',
    foreignField : '_id',
    justOne:true
});


let Location = module.exports = mongoose.model('location', LocationSchema);

// Location.createCollection().then(function(collection) {
//     Location.create(

//     {
//         "status" : true,
//         "prix" : 20,
//         "type" : 0,
//         "locataire" : "5da39d87a6b37c6a141358e9",
//         "place" : "5db989dcaa8633b19bab6735"
//     },
//     {
//         "status" : true,
//         "prix" : 10,
//         "type" : 0,
//         "locataire" : "5da39d87a6b37c6a141358e9",
//         "place" : "5db9bfedaa8633b19bab68ef"
//     }

    
//     )
//     console.log('Location is created!');
// });

