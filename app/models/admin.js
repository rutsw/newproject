// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var adminSchema = mongoose.Schema({

        username     : String,
        firstname    : String,
        lastname     : String,
        email        : String,
        password     : String



});

// generating a hash
adminSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
adminSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for admin side and expose it to our app
module.exports = mongoose.model('Admin', adminSchema);

//const mongoose = require('mongoose'),
//  Schema = mongoose.Schema;
//
//// create a schema
//const userSchema = new Schema({
//  username: {
//    type: String,
//    unique: true
//  },
//  firstname: String,
//  lastname:String,
//  password:String,
//  slug: {
//    type: String,
//    unique: true
//  },
//  email: String
//});
//
//// middleware -----
//// make sure that the slug is created from the name
//userSchema.pre('save', function(next) {
//  this.slug = slugify(this.username);
//  next();
//});
//
//// create the model
//const userModel = mongoose.model('User', userSchema);
//
//// export the model
//module.exports = userModel;
//
//// function to slugify a name
//function slugify(text) {
//  return text.toString().toLowerCase()
//    .replace(/\s+/g, '-')           // Replace spaces with -
//    //.replace(/[^\w\-]+/g, '')       // Remove all non-word chars
//    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
//    .replace(/^-+/, '')             // Trim - from start of text
//    .replace(/-+$/, '');            // Trim - from end of text
//}