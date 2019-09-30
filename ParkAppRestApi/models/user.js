const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validate = require('mongoose-validator');
const { TE, to } = require('../services/util.service');

let UserSchema = new Schema({
    nom: String,
    prenom: String,
    phone: String,
    email: {
        type: String,
        lowercase: true,
        trim: true,
        index: true,
        unique: true,
        sparse: true,
        validate: [validate({
          validator: 'isEmail',
          message: 'Not a valid email.',
        }),]
    },
    password: String,
    isBanned: Boolean,
    role: {
        type: Schema.Types.ObjectId,
        ref: "role"
    }

}, { timestamps: true });

 
UserSchema.pre('save', async (next) => {

    console.log("=============================== preSave =====================");

    // if (this.isModified('password') || this.isNew) {
    //   let err, salt, hash;
  
    //   hash = bcrypt.hashSync(this.password, 8);

    //   this.password = hash;
    //   // if (err) {
    //   //   TE(err.message, true);
    //   // }
    // } else {
    //   return next();
    // }

});

// UserSchema.methods.comparePassword = async (pw) => {
//   let err, pass;

//   if (!this.password) {
//     TE(err);
//   }

//   if (!pass) {
//     TE('Invalid password');
//   }

//   return this;
// };



let User = mongoose.model('user', UserSchema);

// User.createCollection().then(function(collection) {
//   console.log('User is created!');
// });

module.exports = User;