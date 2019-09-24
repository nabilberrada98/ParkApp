const express = require('express');
require('./db/mongoose');
const app=express();
const port = 3000;
const routerUser=require('./routers/user');
const routertask=require('./routers/task'); 
// app.use((req,res,next)=>{
//     res.status(503).send({error : "API is under maintaince , sir tatji "})
// })

app.use(express.json());
app.use(routerUser);
app.use(routertask);



app.listen(port,()=>{
    console.log('running');
});

