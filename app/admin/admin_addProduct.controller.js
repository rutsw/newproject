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
  req.checkBody('price', 'Price is required.').notEmpty();
  req.checkBody('serialNumber', 'serial Number is required.').notEmpty();
  req.checkBody('description', 'Description is required.').notEmpty();
  req.checkBody('category', 'Category is required.').notEmpty();
  req.checkBody('recommended', 'Recommended is required.').notEmpty();
  req.checkBody('stockpile', 'Stockpile is required.').notEmpty();
    
    // if the product not in stockpile
  if(req.body.stockpile.value=='yes'){
          req.checkBody('amount', 'Amount is required.').notEmpty();
          var amount = req.body.amount;
    }
    else 
        var amount=0;

  // if there are errors, redirect and save errors to flash
  const errors = req.validationErrors();
  console.log(errors);
  if (errors) {
    req.flash('errors', errors.map(err => err.msg));
    return res.redirect('/addProduct');
  }

    
  // add a new product
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    stockpile: req.body.stockpile,
    amount:amount,
    recommended: req.body.recommended,
    imgName: req.body.serialNumber,
    category: req.body.category
});

  // save product
product.save((err) => {
    if (err)
      throw err;

    // set a successful flash message
    req.flash('success', 'Successfuly created new product!');

    // redirect to the newly created product
   // res.redirect(`/cart/${product.slug}`);
    res.redirect(`/admin_deleteProduct`);
  });
}