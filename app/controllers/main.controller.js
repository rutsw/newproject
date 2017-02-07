const Product = require('../models/product');
module.exports = {

	 showProducts: showProducts,
   sendRequest: sendRequest
};


/**
 * Show all products
 */
function showProducts(req, res) {
  // get all products   
  Product.find({}, (err, products) => {
    if (err) {
      res.status(404);
      res.send('Products not found!');
    }

    // return a view with data
    res.render('pages/main', { products: products });
  });
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


