const Product = require('../models/product');
const User = require('../models/user');

var $sidebar="";

fs = require('fs')
fs.readFile('views/admin_side/admin_pages/admin_sideBar.js', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  sidebar=data;
});

module.exports = {
  	showPage:showPage,
  	showMainPage:showMainPage,
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
    res.render('admin_side/admin_pages/login_admin', 
               {layout: 'admin_side/admin',
                sidebar: ''});
}

//show the main page
function showMainPage(req, res){
     if (req.isAuthenticated()){
        if(req.user.local.isadmin)
            {
                res.render('admin_side/admin_pages/main_admin', 
                           {layout: 'admin_side/admin',
                            sidebar:  sidebar,
                            username: req.user.local.username});
            }
        else{
            res.redirect('/');
        }
      }
      else{
          res.redirect('/');
      }
}


//show the updateProductDetails page
function updateProductDetails(req, res){
//	res.render('admin/main_admin');
    res.render('admin_side/admin_pages/admin_updateProductDetails', 
               {layout: 'admin_side/admin',
                sidebar: ''});
}

//show the updateProductDetails page
function userlist(req, res){
      User.find({}, (err, users) => {
    if (err) {
      res.status(404);
      res.send('Users not found!');
    }
    res.render('admin_side/admin_pages/admin_userlist',
               {layout: 'admin_side/admin',
                sidebar: 'admin_side/admin_sideBar',
                users:users});
  });
}






