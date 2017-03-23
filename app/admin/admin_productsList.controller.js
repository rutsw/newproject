const Product = require('../models/product');
const User = require('../models/user');

module.exports = {
  	showProductsList:showProductsList,
    deleteProduct:deleteProduct
   
}


//show the Products List page
function showProductsList(req, res){
            
    Product.find({}, (err, products) => {
    if (err) {
      res.status(404);
      res.send('Products not found!');
    }
        
      if (req.isAuthenticated()){
        if(req.user.local.isadmin)
            {
                res.render('admin_side/admin_pages/admin_productsList',
                           {layout: 'admin_side/admin',
                            sidebar: sidebar,
                            products:products, 
                            user : req.user});
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
    res.redirect('/admin_productsList');
  });
}







