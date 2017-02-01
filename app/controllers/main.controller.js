const Product = require('../models/product');

module.exports = {

	 showProducts: showProducts,
	 showMain: showMain
};

//show the home page
function showMain(req, res) {
	    res.render('pages/main');
}

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

