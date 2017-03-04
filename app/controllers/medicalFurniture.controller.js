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
  // get all products   
  Product.find({category: "medical furniture"}, (err, products) => {
    if (err) {
      res.status(404);
      res.send('Products not found!');
    }

    // return a view with data
    res.render('pages/medicalFurniture', { products: products });
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