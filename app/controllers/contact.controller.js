module.exports = {
	showContact: showContact,
    sendRequest: sendRequest
};


function showContact(req, res) {
    res.render('pages/contact');
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

