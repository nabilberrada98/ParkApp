const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RoleSchema = mongoose.Schema({
    name: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
});


let Role = module.exports = mongoose.model('Role', RoleSchema);

// Role.createCollection().then(function(collection) {
//     Role.create({
//         name: "Locataire"
//     });

//     Role.create({
//         name: "Admin"
//     });

//     Role.create({
//         name: "Proprietaire"
//     });

//     console.log('Role is created!');
// });
