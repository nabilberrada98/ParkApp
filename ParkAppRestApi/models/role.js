const mongoose = require('mongoose');

let RoleSchema = mongoose.Schema({
    name : String,
});


let Role = module.exports = mongoose.model('role', RoleSchema);

// Role.createCollection().then(function(collection) {
//     Role.create({
//         name: "locataire"
//     });

//     Role.create({
//         name: "admin"
//     });

//     Role.create({
//         name: "proprietaire"
//     });

//     console.log('Role is created!');
// });
