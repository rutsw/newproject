const Product   = require('../models/product');
const Cart      = require('../models/cart');
const Recengine = require('../models/recengine');

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
            category: product.category,
            price: product.price,
            amount: product.amount,
            stockpile: product.stockpile,
            imgName: product.imgName
          });
        
          // save product
          cart.save((err) => {
            if (err)
                req.flash('success', 'Successfuly add new product!');
//              throw err;

          // set a successful flash message
          req.flash('success', 'Successfuly add new product!');

   //************* Recommendation******************** 
        if (req.isAuthenticated()){

            // if the user didn't add that product before     
           Recengine.find({username:req.user.local.email , productName: product.name},(err, recegine)=>{
                    // add a recommendation to reqenging
                  const recengine= new Recengine({
                    username: req.user.local.email,
                    product: product.imgName,
                    productName: product.name
                  });


                  // save product
                  recengine.save((err) => {
                    if (err)
                        req.flash('success', 'Recommendation already exist!');

                  // set a successful flash message
                  req.flash('success', 'Successfuly add new recommendation!');
                  });
            });       
        }

        res.redirect(`/cart`);
          
       });
    });
}
