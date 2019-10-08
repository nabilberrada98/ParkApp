var seeder = require('mongoose-seed');

// Connect to MongoDB via Mongoose
seeder.connect('mongodb://localhost/sample-dev', function() {

  // Load Mongoose models
  seeder.loadModels([
    'models/region.js','models/ville.js'
  ]);

  // Clear specified collections
  seeder.clearModels(['Region', 'Ville'], function() {

    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });

  });
});
