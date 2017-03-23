const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// create a schema
const suggestionSchema = new Schema({
  username: String,
  suggestions: [{ product:String,
                  category: String,
                  name :String,
                  price : String,
                  weight :Number
                }],
  id:Number
});

//// middleware -----
//// make sure that the slug is created from the username
//recengineSchema.pre('save', function(next) {
//  this.slug = slugify(this.name);
//  next();
//});

// create the model
const suggestionModel = mongoose.model('Suggestions', suggestionSchema);

// export the model
module.exports = suggestionModel;

//// function to slugify a name
//function slugify(text) {
//  return text.toString().toLowerCase()
////.replace(/\s+/g, '-')           // Replace spaces with -
//    // .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
//    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
//    .replace(/^-+/, '')             // Trim - from start of text
//    .replace(/-+$/, '');            // Trim - from end of text
//}
