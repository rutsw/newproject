const Product = require('../models/product');
const Cart = require('../models/cart');

module.exports = {

  showMedicalFurniture: showMedicalFurniture,
  addToCart: addToCart
}


/**
 * Show all products
 */
function showMedicalFurniture(req, res) {
    
    var userstat_si_so="<a class=\"index\" id=\"signin\" href=\"/login\">התחבר</a>";
    var userstat_su_un="<a class=\"index\" id=\"signup\" href=\"/register\">/הרשם</a>";
    
      // get all products   
    Product.find({category: "medical furniture"}, (err, products) => {

    if (err) {
      res.status(404);
      res.send('Products not found!');
    }

    
    //check if the user is conected

    if (req.isAuthenticated()){
        userstat_su_un = " שלום, "+req.user.local.username;
        userstat_si_so = "<a class=\"index\" id=\"signout\" href=\"/logout\">/התנתק</a>";
        

        res.render('pages/medicalFurniture', {products: products, userstat_su_un:userstat_su_un ,userstat_si_so:userstat_si_so});

    }
      
    // return a view with data in case user didn't connect
    else{

        res.render('pages/medicalFurniture', {products: products, userstat_su_un: userstat_su_un ,userstat_si_so:userstat_si_so  });
    }

  });
}


/**
 * Add product to cart
 */
function addToCart(req,res){ 
   Product.findOne({slug: req.params.slug},(err,product)=>
        {
          // add a product to cart
          const cart= new Cart({
            name: product.name,
            description: product.description,
            imgName: product.imgName
          });
        
          // save product
          cart.save((err) => {
            if (err)
              throw err;

          // set a successful flash message
          req.flash('success', 'Successfuly add new product!');

          // redirect to the newly created product
          // res.redirect(`/cart/${product.slug}`);
          res.redirect(`/cart`);
          //res.redirect(`/medicalProducts`);
          });
         });   
}

