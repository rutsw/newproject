const Product = require('../models/product');
const User = require('../models/user');

module.exports = {
    addProduct:addProduct,
    processCreate:processCreate
    
}


//show the addproduct page
function addProduct(req, res){
    if (req.isAuthenticated()){
        if(req.user.local.isadmin)
            {
                res.render('admin_side/admin_pages/admin_addProduct', {layout: 'admin_side/admin',errors: req.flash('errors')});
            }
        else{
            res.redirect('/');
        }
      }
      else{
          res.redirect('/');
      }
//    res.render('admin_side/admin_pages/admin_addProduct', {layout: 'admin_side/admin' });
}

///**
// * Show the create form
// */
//function showCreate(req, res) {
//  res.render('pages/create', {
//    errors: req.flash('errors')
//  });
//}

/**
 * Process the creation form
 */
function processCreate(req, res) {
  // validate information
  req.checkBody('name', 'Name is required.').notEmpty();
  req.checkBody('description', 'Description is required.').notEmpty();
  req.checkBody('name', 'Name is required.').notEmpty();
  req.checkBody('description', 'Description is required.').notEmpty();

  // if there are errors, redirect and save errors to flash
  const errors = req.validationErrors();
  console.log(errors);
  if (errors) {
    req.flash('errors', errors.map(err => err.msg));
    return res.redirect('/cart/create');
  }

  // add a new product
  const product = new Product({
    name: req.body.name,
    description: req.body.description
  });

  // save product
product.save((err) => {
    if (err)
      throw err;

    // set a successful flash message
    req.flash('success', 'Successfuly created new product!');

    // redirect to the newly created product
   // res.redirect(`/cart/${product.slug}`);
    res.redirect(`/cart`);
  });
}