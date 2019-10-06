const dataSeed= require('mongoose-data-seed');
const Region =require('../models/region');

const data = require('./datas/regionData.json');

class RegionsSeeder extends dataSeed.Seeder {

  async shouldRun() {
    return Region.countDocuments().exec().then(count => count === 0);
  }

  async run() {
    return Region.create(data);
  }
}

module.exports = RegionsSeeder;
