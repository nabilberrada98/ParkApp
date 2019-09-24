const express = require('express');
const router=new express.Router();
const auth=require('../middleware/auth');
const Task=require('../models/task');


router.post('/tasks',auth,async (req,res) =>{
    const task=new Task({
        ...req.body,
        owner : req.user._id
    });
    try{
        await task.save();
        res.status(201).send(task);
    }catch(error){
        res.status(400).send(error);
    };
})
// /tasks?completed=false
//limit and skip for pagination
//Sorting is possible 
router.get('/tasks',auth,async (req,res)=>{
    const match ={};
    const sort = {};
    if(req.query.completed)
        match.completed = req.query.completed ==='true'
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] =parts[1]==='desc'?-1:1; 
    }
    try { 
        await req.user.populate({
            path : 'tasks',
            match,
            options : {
                //will be ignored if not provided
                limit : parseInt(req.query.limit),
                skip : parseInt(req.query.limit),
                sort 
            }
        }).execPopulate();
        res.send(req.user.tasks);
    } catch (e) {
        res.status(500).send(e);
    }
})

router.get('/tasks/:id',auth,async (req,res)=>{
    try {
        const task=await Task.findOne({ _id : req.param._id, owner : req.user._id});
        if(!task){
            return res.status(404).send();
        } 
        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
})

router.delete('/tasks/:id',auth,async (req,res)=>{
    try {
        const id = req.param.id;
        const task=await Task.findOneAndDelete({_id : id,owner : req.user._id});
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(400).send();
    }
});

router.patch('/tasks/:id',auth,async (req,res)=>{
    const updates =Object.keys(req.body);
    const allowedProps=['completed','description'];
    const isValid=updates.every((update)=>{
        return allowedProps.includes(update);
    });
    if(!isValid)
        return res.status(404).send({error : 'Invalid fields'});
    try {
        const id = req.param.id;
        const task=await Task.findOne({_id : id,owner : req.user._id});
        if(!task){
            return res.status(404).send();
        }
        updates.forEach((update)=> task[update]=req.body[update]);
        task.save();
        //const task=await Task.findByIdAndUpdate(id,req.body,{new : true,runValidators : true});
        res.send(task);
    } catch (e) {
        res.status(400).send();
    }
});


module.exports=router;