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
    isBanned: {
      type : Boolean,
      default : false
    },
    role: {
        required : true,
        type: Schema.Types.ObjectId,
        ref: "role"
    }
    
}, { timestamps: true, toJSON: { virtuals: true } });


UserSchema.virtual('reservations',{
    ref : 'reservation',
    localField : '_id',
    foreignField : 'user'
});

UserSchema.virtual('libelles',{
  ref : 'libelle',
  localField : '_id',
  foreignField : 'user'
});


UserSchema.virtual('location',{
    ref : 'location',
    localField : '_id',
    foreignField : 'user'
});


UserSchema.pre('save', async function (next) {

    if (this.isModified('password') || this.isNew) {
      this.password = await bcrypt.hash(this.password, 8);
    }else{
      return next();
    }

});

// UserSchema.methods.comparePassword = async function(pw){
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