// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        username     : String,
        firstname    : String,
        lastname     : String,
        telephone    : Number,
        isadmin      : Boolean,
        email        : String,
        password     : String
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);

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