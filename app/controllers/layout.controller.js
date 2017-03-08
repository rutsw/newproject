const User = require('../models/user')


module.exports = {
  	showLogin:showLogin,
}

//show the login page
function showLogin(req, res){
    var userstat_si_so="<a class=\"index\" id=\"signin\" href=\"/login\">התחבר</a>";
    var userstat_su_un="<a class=\"index\" id=\"signup\" href=\"/register\">/הרשם</a>";

     if(req.isAuthenticated()){
          userstat_si_so="<a class=\"index\" id=\"signout\" href=\"/logout\">/התנתק</a>";    
    }      
     res.render('pages/signin.ejs',{message: req.flash('loginMessage'), userstat_su_un:userstat_su_un, userstat_si_so:userstat_si_so});
       
}

	