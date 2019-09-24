const mongoose = require('mongoose');
const conUrl='mongodb://127.0.0.1:27017/ParkApp-api';

mongoose.connect(conUrl,{useNewUrlParser : true,useCreateIndex : true});

