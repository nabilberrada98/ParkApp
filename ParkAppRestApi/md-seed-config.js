const mongoose = require("mongoose")
const CONFIG = require('./config/config');
const mongoURL = 'mongodb://'+CONFIG.db_host+':'+CONFIG.db_port+'/'+CONFIG.db_name;
const RegionsSeeder = require('./seeders/regions.seeder');
/**
 * Seeders List
 * order is important
 * @type {Object}
 */
module.exports = seedersList = {
  RegionsSeeder
};
/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
module.exports = connect = async () =>{
   return await mongoose.connect(mongoURL, { useNewUrlParser: true });
}
 
/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
module.exports = dropdb = async () => {
  return mongoose.connection.db.dropDatabase()
};
