module.exports = {
  show44hCourse: show44hCourse
}


// show 44h course page
function show44hCourse(req, res){
    
    var userstat_si_so="<a class=\"index\" id=\"signin\" href=\"/login\">התחבר</a>";
    var userstat_su_un="<a class=\"index\" id=\"signup\" href=\"/register\">הרשם</a>"+" | ";
    
    //check if the user is conected
    if (req.isAuthenticated()){
        userstat_su_un = " שלום "+req.user.local.username+" | ";
        userstat_si_so = "<a class=\"index\" id=\"signout\" href=\"/logout\">התנתק</a>";
        
        res.render('pages/44hCourse', {userstat_su_un:userstat_su_un ,userstat_si_so:userstat_si_so});
    }
      
    // return a view with data in case user didn't connect
    else{
        
        res.render('pages/44hCourse', { userstat_su_un: userstat_su_un ,userstat_si_so:userstat_si_so  });
    }
    
}