const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SessionSchema = mongoose.Schema({
    expire_at: String,
    token: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
});


let Session = module.exports = mongoose.model('Session', SessionSchema);

// Session.createCollection().then(function(collection) {
//     console.log('Session is created!');
// });

