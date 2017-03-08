const User = require('../models/user')


module.exports = {
  	showLogin:showLogin,
}

//show the login page
function showLogin(req, res){
    var userstat="";
    var title="";
//    req.bodyParser.getElementById(signin).style.display="none";
     if(req.isAuthenticated()){
////       req.bodyParser.getElementById(signin).style.display="none";
          userstat="<a class=\"index\" id=\"signout\" href=\"/logout\">/התנתק</a>";
//         
    }
//	res.redirect('/');
    
       
        res.render('pages/signin.ejs', {message: req.flash('loginMessage'), title:title , userstat:userstat});
       
}

	