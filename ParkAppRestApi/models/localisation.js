const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Ville = require('./ville');
let LocalisationSchema = mongoose.Schema({  
    type: "Point",
    coordinates: [ Number, Number ],
    ville: {
        type: Schema.Types.ObjectId,
        ref: "ville"
    },
});


LocalisationSchema.virtual('libelles',{
    ref : 'libelle',
    localField : '_id',
    foreignField : 'loc',
    justOne: true
});
LocalisationSchema.virtual('places',{
    ref : 'place',
    localField : '_id',
    foreignField : 'localisation'
});



LocalisationSchema.pre('save', async function (next) {
    this.ville = await Ville.find({nom : this.ville});
    console.log('ville founded');
    //   return next();
});

let Localisation = module.exports = mongoose.model('localisation', LocalisationSchema);
// Localisation.createCollection().then(function(collection) {
//     console.log('localisation is created!');
// });
