const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// create a schema
const suggestionSchema = new Schema({
  username: String,
  suggestions: [{ product:String,
                  category: String,
                  name : String,
                  price : String,
                  weight :Number
                }],
  id:Number
});



// create the model
const suggestionModel = mongoose.model('Suggestions', suggestionSchema);

// export the model
module.exports = suggestionModel;


