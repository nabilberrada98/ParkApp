const {MongoClient,ObjectID}=require('mongodb');

const conUrl='mongodb://127.0.0.1:27017';
const dbname='ParkApp';
MongoClient.connect(conUrl,{useNewUrlParser : true},(error,client)=>{
    if(error){
        return console.log('unable to connect');
    }
});