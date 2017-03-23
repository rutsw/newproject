const User= require('../models/user');

module.exports = {
  showRegister:showRegister,
  processRegister:processRegister
}


//show the login page
function showLogin(req, res){
	res.render('pages/login');
}

// show the register page
function showRegister(req, res){
    
    var userstat_si_so="<a class=\"index\" id=\"signin\" href=\"/login\">התחבר</a>";
    var userstat_su_un="<a class=\"index\" id=\"signup\" href=\"/register\">הרשם</a>"+" | ";
    
    //check if the user is conected
    if (req.isAuthenticated()){
        userstat_su_un = " שלום "+req.user.local.username+" | ";
        userstat_si_so = "<a class=\"index\" id=\"signout\" href=\"/logout\">התנתק</a>";
        
        res.render('pages/register', {message: req.flash('signupMessage'),userstat_su_un:userstat_su_un ,userstat_si_so:userstat_si_so});
//                                     ,'errors: req.flash('errors')});
        // res.render('pages/register', {userstat_su_un:userstat_su_un ,userstat_si_so:userstat_si_so,
                                     // errors: req.flash('errors'),message: req.flash('signupMessage')});
    }
      
    // return a view with data in case user didn't connect
    else{
        
        res.render('pages/register', {message: req.flash('signupMessage'), userstat_su_un: userstat_su_un ,userstat_si_so:userstat_si_so });
//                                      ,errors: req.flash('errors') });
    }
//	res.render('pages/register', {
//    		errors: req.flash('errors')
// 	});
}


/**
* Process the creation form
*/
function processRegister(req, res) {
// validate information
	req.checkBody('username', 'UserName is required.').notEmpty();
	req.checkBody('firstname', 'firsName is required.').notEmpty();
	req.checkBody('lastname', 'lastName is required.').notEmpty();
	req.checkBody('telephone', 'telephone is required.').notEmpty();
	req.checkBody('password', 'password is required.').notEmpty();
	req.checkBody('confirmpassword', 'confirm-password is required.').notEmpty();
	req.checkBody('email', 'mail is required.').notEmpty();

	// if there are errors, redirect and save errors to flash
	const errors = req.validationErrors();
	console.log(errors);
	if (errors) {
		req.flash('errors', errors.map(err => err.msg));
	    return res.redirect('/register');
	}

	// add a new user
	const user = new User({
	 	username: req.body.username,
	    firstname: req.body.firstname,
	    lastname: req.body.lastname,
        telephone: req.body.telephone,
	    password: req.body.password,
	    email: req.body.email
	});

	// save user
	user.save((err) => {
		if (err)
	      throw err;

	 	// set a successful flash message
	    req.flash('success', 'Successfuly created new user!');
        
	    // redirect to the newly created product
	   // res.redirect(`/cart/${product.slug}`);
	    res.redirect(`/`);
	});
}

