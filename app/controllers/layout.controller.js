const User = require('../models/user')


module.exports = {
  	showLogin:showLogin,
}

//show the login page
function showLogin(req, res){
    var userstat="<a class=\"index\" id=\"signin\" href=\"/login\">התחבר</a>";
    var title="<a class=\"index\" id=\"signup\" href=\"/register\">/הרשם</a>";

     if(req.isAuthenticated()){
          userstat="<a class=\"index\" id=\"signout\" href=\"/logout\">/התנתק</a>";    
    }      
     res.render('pages/signin.ejs', {message: req.flash('loginMessage'), title:title , userstat:userstat});
       
}

	