const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// create a schema
const recengineSchema = new Schema({
  username: String,
  product: String,
  productName:String
});



// create the model
const recengineModel = mongoose.model('Recengine', recengineSchema);

// export the model
module.exports = recengineModel;

