const Product = require('../models/product');
const User = require('../models/user');

module.exports = {
  	showPage:showPage,
    deleteProduct:deleteProduct,
    addProduct:addProduct,
    updateProductDetails:updateProductDetails,
    userlist:userlist
    
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

//     return next();
    res.redirect('/');
}

//show the login page
function showPage(req, res){
//	res.render('admin/main_admin');
    res.render('admin_side/admin_pages/main_admin', { layout: 'admin_side/admin' });
}

//show the deleteproduct page
function deleteProduct(req, res){
            
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
    
    // return a view with data
//    res.render('admin_side/admin_pages/admin_deleteProduct', {layout: 'admin_side/admin' , products:products , user : req.user});
  });   
}

//show the deleteproduct page
function addProduct(req, res){
    res.render('admin_side/admin_pages/admin_addProduct', {layout: 'admin_side/admin' });
}

//show the updateProductDetails page
function updateProductDetails(req, res){
//	res.render('admin/main_admin');
    res.render('admin_side/admin_pages/admin_updateProductDetails', {layout: 'admin_side/admin'});
}

//show the updateProductDetails page
function userlist(req, res){
      User.find({}, (err, users) => {
    if (err) {
      res.status(404);
      res.send('Users not found!');
    }
    res.render('admin_side/admin_pages/admin_userlist', {layout: 'admin_side/admin', users:users});
  });
}






