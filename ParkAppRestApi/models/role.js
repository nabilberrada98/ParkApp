const mongoose = require('mongoose');

let RoleSchema = mongoose.Schema({
    name: String,
});


let Role = module.exports = mongoose.model('role', RoleSchema);

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
