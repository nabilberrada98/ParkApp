const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task =require('./task')
const userSchema=new mongoose.Schema({
    name :{
        type : String,
        required : true,
        trim : true
    },
    email : {
        type:String,
        unique : true,
        required : true,
        trim : true,
        lowercase : true,
        validator(value){
            if(!validator.isEmail(value))
                throw new Error('Email invalid')
        }
    },
    password : {
        type : String,
        required : true,
        minlength : 7,
        trim : true,
        validate(value){
            if(value.toLowerCase().includes("password"))
                throw new Error('kteb ha pass mzian')
        }
    },
    age : {
        type : Number,
        default : 0,
        validate(value){
            if(value< 0)
                throw new Error('maymkench tkun makaynch HHHHH')
        }
    },
    tokens : [{
        token : {
            type : String,
            required : true
        }
    }] 
},{
    timestamps : true
});

userSchema.statics.findByCredentials = async (email,password)=>{
    const user = await User.findOne({email});
    console.log(user);
    if(!user)
        throw new Error('unable to login');
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch)
        throw new Error('unable to login');
    return user;
};

userSchema.methods.generateAuthToken=async function(){
    const token=jwt.sign({_id : this._id.toString() },'thisIsNodeCourse');
    this.tokens = this.tokens.concat({token});
    await this.save();
    return token;
}
userSchema.methods.toJSON= function(){
    const user = this.toObject();
    delete user.password;
    delete user.tokens;
    return user;
}

userSchema.virtual('tasks',{
    ref : 'Task',
    localField : '_id',
    foreignField : 'owner'
}) 
//hash middleware
userSchema.pre('save', async function (next){
    //this is the user
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,8);
    }
    console.log('hashing');
    next();
})

//delete user task when removed

userSchema.pre('remove', async function (next){
    //this is the user
    console.log('deleting it tasks');
    await Task.deleteMany({owner : this._id});
    next();
})


const User = mongoose.model('User',userSchema);

module.exports=User;