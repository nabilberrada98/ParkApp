const express = require('express');
const router=new express.Router();
const User=require('../models/user');
const auth=require('../middleware/auth');
const multer = require('multer');
const multerConfig = multer({
    dest : 'avatar',
    limits : {
        fileSize : 1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(doc|docx)$/)){
            return cb(new Error('file Must be a word doc you dumb haha'))
        }
        // cb(new Error('file Must be a pdf you dumb haha'))
        return cb(undefined,true)
    }
});

router.post('/users',async (req,res) =>{
    const user=new User(req.body);
    try {
        await user.save();
        const token=await user.generateAuthToken();
        res.status(201).send({user,token});
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/users/login',async (req,res) => {
    try {
        const user = await User.findByCredentials(req.body.email,req.body.password);
        const token=await user.generateAuthToken();
        res.send({user,token});
    } catch (e) {
        res.status(404).send();
    }
})

router.post('/users/logout',auth,async (req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token;
        })
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

router.post('/users/logoutAll',auth,async (req,res)=>{
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
})

router.get('/users', auth ,async (req,res)=>{
    try {
        const users = await User.find({});
        res.send(users);
    } catch (e) {
        res.status(500).send(error);
    }
});

router.get('/users/me', auth ,async (req,res)=>{
    try {
        const users = await User.find({});
        res.send(users);
    } catch (e) {
        res.status(500).send(error);
    }
});

router.post('/users/me/avatar',multerConfig.single('avatar'),(req,res)=>{
    res.send();
});

router.get('/users/:id',async (req,res)=>{
    try {
        const user=User.findById(req.params.id);
        if(!user){
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(500).send(e);
    }
})

router.patch('/users/me',auth,async (req,res)=>{
    const updates = Object.keys(req.body);
    const allowedProps=['name','email','password','age'];
    const isValid = updates.every((update)=>{
        return allowedProps.includes(update);
    });
    if(!isValid)
        return res.status(404).send({error : 'Invalid fiels'});
    
    try {
        updates.forEach((update)=> req.user[update] = req.body[update])
        await req.user.save();
        //const user=await User.findByIdAndUpdate(id,req.body,{new : true,runValidators : true});
        res.send(req.user);
    } catch (e) {
        res.status(400).send();
    }
});

router.delete('/users/me',auth,async (req,res)=>{
    try {
        await req.user.remove();
        res.send(req.user);
    } catch (e) {
        res.status(400).send();
    }
});


module.exports=router;