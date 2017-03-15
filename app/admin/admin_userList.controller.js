const Product = require('../models/product');
const User = require('../models/user');

module.exports = {
  	showUserList:showUserList,
    deleteUser:deleteUser
   
}

////show the updateProductDetails page
//function showUserlist(req, res){
//      User.find({}, (err, users) => {
//    if (err) {
//      res.status(404);
//      res.send('Users not found!');
//    }
//    res.render('admin_side/admin_pages/admin_userlist', {layout: 'admin_side/admin', users:users});
//  });
//}


//show the users list page
function showUserList(req, res){
            
    User.find({}, (err, users) => {
    if (err) {
      res.status(404);
      res.send('Users not found!');
    }
        
      if (req.isAuthenticated()){
        if(req.user.local.isadmin)
            {
                res.render('admin_side/admin_pages/admin_userlist', 
                           {layout: 'admin_side/admin', 
                            sidebar: sidebar, 
                            users:users, 
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
 * Delete user
 */
function deleteUser(req, res) {
  User.remove({ user: req.params.username }, (err) => {
    // set flash data
    // redirect back to the cart page
    req.flash('success', 'User deleted!');
    res.redirect('/admin_userlist');
  });
}







