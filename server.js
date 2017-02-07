// load environment variables
require('dotenv').config();


// grab our dependencies
const express    = require('express'),
  app            = express(),
  port           = process.env.PORT || 8080,
  expressLayouts = require('express-ejs-layouts'),
  mongoose       = require('mongoose');
  mongoose.Promise = global.Promise;
  passport       = require('passport');
  bodyParser     = require('body-parser'),
  session        = require('express-session'),
  cookieParser   = require('cookie-parser'),
  flash          = require('connect-flash'),
  expressValidator = require('express-validator'),
  morgan         = require('morgan'),
  nodemailer     = require('nodemailer'),
  smtpTransport  = require('nodemailer-smtp-transport'),
  session        = require('express-session'),


// configure our application ===================
// set sessions and cookie parser
app.use(expressValidator());
app.use(cookieParser());//read coo
app.use(session({
  secret: process.env.SECRET, 
  cookie: { maxAge: 60000 },
  resave: false,    // forces the session to be saved back to the store
  saveUninitialized: false  // dont save unmodified
}));
app.use(flash());


// tell express where to look for static assets
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/img'));
app.use(express.static(__dirname + '/pdf'));


// set ejs as our templating engine
app.set('view engine', 'ejs');
app.use(expressLayouts);


// connect to our database
mongoose.connect(process.env.DB_URI);

//set body parser to grab info from a form
app.use(bodyParser.urlencoded({extended: true}));

// set the routes =============================
app.use(require('./app/routes'));


// start our server ===========================
app.listen(port);
  console.log("App listening on http://localhost" + port);