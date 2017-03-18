const Product = require('../models/product');
const User = require('../models/user');

module.exports = {
  	showUpdateProduct:showUpdateProduct,
    updateProduct:updateProduct,
   
}



//show the deleteproduct page
function showUpdateProduct(req, res){
            
    Product.findOne({ slug: req.params.slug }, (err, product) => {
    if (err) {
      res.status(404);
      res.send('Product not found!');
    }
        
      if (req.isAuthenticated()){
        if(req.user.local.isadmin)
            {
                res.render('admin_side/admin_pages/admin_updateProduct',
                           {layout: 'admin_side/admin',
                            sidebar: sidebar,
                            product:product, 
                            errors: req.flash('errors')});
            }
        else{
            res.redirect('/');
        }
      }
      else{
          res.redirect('/');
      }

  });   
}

/**
 * Show the edit form
 */
//function showEdit(req, res) {
//  Product.findOne({ slug: req.params.slug }, (err, product) => {
//    res.render('pages/edit', {
//      product: product,
//      errors: req.flash('errors')
//    });
//  })
//}

/**
 * Process the edit form
 */
function updateProduct(req, res) {
  // validate information
  req.checkBody('name', 'Name is required.').notEmpty();
//  req.checkBody('description', 'Description is required.').notEmpty();

  // if there are errors, redirect and save errors to flash
  const errors = req.validationErrors();
  if (errors) {
    req.flash('errors', errors.map(err => err.msg));
    return res.redirect(`/updateProduct/${req.params.slug}/update`);
  }

  // finding a current product
  Product.findOne({ slug: req.params.slug }, (err, product) => {
    // updating that product
    product.name        = req.body.name;
    product.description = req.body.description;
    product.price       = req.body.price;
    product.recommended = req.body.recommended;
    product.imgName     = req.body.serialNumber;
    product.category    = req.body.category;
    product.stockpile   = req.body.stockpile;
    product.amount      = req.body.amount;

    product.save((err) => {
      if (err)
        throw err;

      // success flash message
      // redirect back to the /cart
      req.flash('success', 'Successfully updated product.');
      res.redirect('/admin_productsList');
    });
  });
}










