const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// create a schema
const recengineSchema = new Schema({
  username: String,
  product: Number,
  productName:String
});

//// middleware -----
//// make sure that the slug is created from the username
//recengineSchema.pre('save', function(next) {
//  this.slug = slugify(this.name);
//  next();
//});

// create the model
const recengineModel = mongoose.model('Recengine', recengineSchema);

// export the model
module.exports = recengineModel;

//// function to slugify a name
//function slugify(text) {
//  return text.toString().toLowerCase()
////.replace(/\s+/g, '-')           // Replace spaces with -
//    // .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
//    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
//    .replace(/^-+/, '')             // Trim - from start of text
//    .replace(/-+$/, '');            // Trim - from end of text
//}