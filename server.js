// load environment variables
require('dotenv').config();


// grab our dependencies
var express    = require('express');
var app            = express();
var port           = process.env.PORT || 8080;
var expressLayouts = require('express-ejs-layouts');
var  mongoose       = require('mongoose');
mongoose.Promise = global.Promise;
var  passport       = require('passport');
var  bodyParser     = require('body-parser');
var session        = require('express-session');
var cookieParser   = require('cookie-parser');
var flash          = require('connect-flash');
var expressValidator = require('express-validator');
var morgan         = require('morgan');
var nodemailer     = require('nodemailer');
var  smtpTransport  = require('nodemailer-smtp-transport');
var  session        = require('express-session');
var expressValidator = require('express-validator');


// configure our application ===================
      
require('./config/passport')(passport); // pass passport for configuration


// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());


// required for passport
app.use(session({
    secret: 'idowhateveriwanttamarmiryamfinala', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use conn



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
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport



// start our server ===========================
app.listen(port);
  console.log("App listening on http://localhost" + port);