const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// create a schema
const userSchema = new Schema({
  username: String,
  firstname: String,
  lastname:String,
  password:String,
  slug: {
    type: String,
    unique: true
  },
  email: String
});

// middleware -----
// make sure that the slug is created from the name
userSchema.pre('save', function(next) {
  this.slug = slugify(this.username);
  next();
});

// create the model
const userModel = mongoose.model('User', userSchema);

// export the model
module.exports = userModel;

// function to slugify a name
function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    //.replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}