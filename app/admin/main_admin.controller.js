
const User = require('../models/user');

module.exports = {
  	showPage:showPage,
}

//show the login page
function showPage(req, res){
	res.render('admin/main_admin');
}






