const User = require('../models/user');

module.exports = {
  showLogin:showLogin,
  
}


	//show the login page
	  function showLogin(req, res){
	  res.render('pages/login');
	}

	