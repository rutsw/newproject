const Product = require('../models/product');
const User = require('../models/user');

module.exports = {
  	showDeleteProduct:showDeleteProduct,
    deleteProduct:deleteProduct,
   
}



//show the deleteproduct page
function showDeleteProduct(req, res){
            
    Product.find({}, (err, products) => {
    if (err) {
      res.status(404);
      res.send('Products not found!');
    }
        
      if (req.isAuthenticated()){
        if(req.user.local.isadmin)
            {
                res.render('admin_side/admin_pages/admin_deleteProduct', {layout: 'admin_side/admin' , products:products , user : req.user});
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
 * Delete an product
 */
function deleteProduct(req, res) {
  Product.remove({ slug: req.params.slug }, (err) => {
    // set flash data
    // redirect back to the cart page
    req.flash('success', 'Product deleted!');
    res.redirect('/admin_deleteProduct');
  });
}







