const Product = require('../models/product');
const Cart = require('../models/cart');

module.exports = {
  showMedicalProducts: showMedicalProducts,
  addToCart: addToCart
}


/**
 * Show all products
 */
function showMedicalProducts(req, res) {
  var userstat_si_so="<a class=\"index\" id=\"signin\" href=\"/login\">התחבר</a>";
  var userstat_su_un="<a class=\"index\" id=\"signup\" href=\"/register\">הרשם/</a>";
    
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
        
        res.render('pages/medicalProduct', { products: products ,userstat_su_un:userstat_su_un ,userstat_si_so:userstat_si_so});
    }
      
    // return a view with data in case user didn't connect
    else{
        
        res.render('pages/medicalProduct', { products: products , userstat_su_un: userstat_su_un ,userstat_si_so:userstat_si_so  });
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



///**
// * Delete an product
// */
//function deleteProduct(req, res) {
//  Product.remove({ slug: req.params.slug }, (err) => {
//    // set flash data
//    // redirect back to the cart page
//    req.flash('success', 'Product deleted!');
//    res.redirect('/cart');
//  });
//}
//
//
//
///**
// * Process the creation form
// */
//function processCreate(req, res) {
//  // validate information
//  req.checkBody('name', 'Name is required.').notEmpty();
//  req.checkBody('description', 'Description is required.').notEmpty();
//
//  // if there are errors, redirect and save errors to flash
//  const errors = req.validationErrors();
////////
//  console.log(errors);
///////
//  if (errors) {
//    req.flash('errors', errors.map(err => err.msg));
//    return res.redirect('/cart/create');
//  }
//
//  // add a new product
//  const product = new Product({
//    name: req.body.name,
//    description: req.body.description
//  });
//
//  // save product
// product.save((err) => {
//    if (err)
//      throw err;
//
//    // set a successful flash message
//    req.flash('success', 'Successfuly created new product!');
//
//    // redirect to the newly created product
//   // res.redirect(`/cart/${product.slug}`);
//    res.redirect(`/cart`);
//  });
//}
//
//
//