const Product = require('../models/product');


module.exports = {

    showProducts: showProducts,
    sendRequest: sendRequest
};


/*
 * Show all products
 */

function showProducts(req, res) {
  
  var userstat_su_un="<a class=\"index\" id=\"signup\" href=\"/register\">/הרשם</a>";
  var userstat_si_so="<a class=\"index\" id=\"signin\" href=\"/login\">התחבר</a>";
// get all products
  Product.find({category: "medical product"}, (err, products) => {
    if (err) {
      res.status(404);
      res.send('Products not found!');
    }
      
    //check if the user is conected
    if (req.isAuthenticated()){
        userstat_su_un = " ,שלום"+req.user.local.username;
        userstat_si_so = "<a class=\"index\" id=\"signout\" href=\"/logout\">/התנתק</a>";
        
        res.render('pages/main', { products: products ,userstat_su_un:userstat_su_un ,userstat_si_so:userstat_si_so});
    }
      
    // return a view with data in case user didn't connect
    else{
        
        res.render('pages/main', { products: products , userstat_su_un: userstat_su_un ,userstat_si_so:userstat_si_so  });
        }
  });
}


/*
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
  
    console.log('name is:' + req.body.name);
    var mailOptions = {
    from: req.body.email, // sender address
    to: 'tamimamo@gmail.com', // list of receivers
    subject: 'מייל מהאתר הדרך להציל חיים', // Subject line
    text: " נשלח מאת: "+req.body.name+"\n כתובת מייל: "+req.body.email+"\n תוכן ההודעה: "+req.body.query // plaintext body
  };
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          console.log(error);
          res.json({yo: 'error'});
      }else{
          console.log('Message sent: ' + info.response);
          //res.json({yo: info.response});
      };
      //res.render('pages/main',{ products: products });
      res.redirect(`/`);
    });
}


