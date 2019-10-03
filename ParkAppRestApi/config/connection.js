const mongoose = require("mongoose")
const CONFIG = require('./config');


mongoose.Promise = global.Promise;
const mongo_location = 'mongodb://'+CONFIG.db_host+':'+CONFIG.db_port+'/'+CONFIG.db_name;
mongoose.connect(mongo_location, { useNewUrlParser: true, useUnifiedTopology: true }).then( () => {
  console.log("[+] Connected to the DB : ");
}).catch((err)=>{
  console.log('*** Can Not Connect to Mongo Server:', mongo_location)
});