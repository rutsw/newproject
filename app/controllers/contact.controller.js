module.exports = {
	showContact: showContact,
    sendRequest: sendRequest
};


function showContact(req, res) {
    
    var userstat_si_so="<a class=\"index\" id=\"signin\" href=\"/login\">התחבר</a>";
    var userstat_su_un="<a class=\"index\" id=\"signup\" href=\"/register\">/הרשם</a>";
    
    //check if the user is conected
    if (req.isAuthenticated()){
        userstat_su_un = " שלום, "+req.user.local.username;
        userstat_si_so = "<a class=\"index\" id=\"signout\" href=\"/logout\">/התנתק</a>";
        
        res.render('pages/contact', {userstat_su_un:userstat_su_un ,userstat_si_so:userstat_si_so});
    }
      
    // return a view with data in case user didn't connect
    else{
        
        res.render('pages/contact', { userstat_su_un: userstat_su_un ,userstat_si_so:userstat_si_so  });
    }

 }

/**
 * Send request
 */
function sendRequest(req, res) {
  //send mail
  var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: 'miryam993@gmail.com',
        pass: 'mary010293'
    }
  }));
  
  
  var mailOptions = {
    from: req.body.email, // sender address
    to: 'tamimamo@gmail.com', // list of receivers
    subject: 'מייל מהאתר הדרך להציל חיים', // Subject line
    text: " נשלח מאת: "+req.body.name+"\n ארגון: "+req.body.organization_name+"\n כתובת מייל: "
    +req.body.email+"\n טלפון: "+req.body.phone+"\n נושא: "+req.body.subject+"\n תוכן ההודעה: "+req.body.message // plaintext body
  };
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          console.log(error);
          res.json({yo: 'error'});
      }else{
          console.log('Message sent: ' + info.response);
          //res.json({yo: info.response});
      };
      res.redirect(`/contact`);
    });
}

