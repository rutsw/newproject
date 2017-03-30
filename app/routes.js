 module.exports = function(app, passport) {
     
//create a new express app
     
  //client controllers
  layoutController  = require('./controllers/layout.controller'),
  registerController= require('./controllers/register.controller'),
  mainController    = require('./controllers/main.controller'),
  contactController = require('./controllers/contact.controller'),
  aboutController   = require('./controllers/about.controller'),
  coursesController = require('./controllers/courses.controller'),
  fHCourseController= require('./controllers/4hCourse.controller'),
  eHCourseController= require('./controllers/8hCourse.controller'),
  ttHCourseController = require('./controllers/22hCourse.controller'),
  thHCourseController = require('./controllers/28hCourse.controller'),
  ffHCourseController = require('./controllers/44hCourse.controller'),
  sHCourseController  = require('./controllers/60hCourse.controller'),
  fHBabyCourseController = require('./controllers/4hBabyCourse.controller'),
  medicalTeamsCourseController  = require('./controllers/medicalTeamsCourse.controller'),
  paramedicCourseController     = require('./controllers/paramedicCourse.controller'),
  approvalsController           = require('./controllers/approvals.controller'),
  recommendationController  = require('./controllers/recommendation.controller'),
  cartController            = require('./controllers/cart.controller'),
  onlineCourseController    = require('./controllers/onlineCourse.controller'),
  medicalEquipmentController= require('./controllers/medicalEquipment.controller'),
  medicalProductController  = require('./controllers/medicalProduct.controller'),
  medicalFurnitureController     = require('./controllers/medicalFurniture.controller'),
  equipmentCPRFirstAidController = require('./controllers/equipmentCPRFirstAid.controller'),
  firstAidKitsController         = require('./controllers/firstAidKits.controller'),
  trainingandSimulationEquipmentController = require('./controllers/trainingandSimulationEquipment.controller'),
  

  //admin controllers
  loginAdminController = require('./admin/login_admin.controller');
  addProductdAdminController = require('./admin/admin_addProduct.controller');
  productsListAdminController = require('./admin/admin_productsList.controller');
  userListAdminController = require('./admin/admin_userList.controller');
  updateProductAdminController = require('./admin/admin_updateProduct.controller');
   

// AUTHENTICATE (FIRST LOGIN) 
// =============================================================================

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // process the signup form
        app.post('/register', passport.authenticate('local-signup', {
            successRedirect : '/', // redirect to the secure profile section
            failureRedirect : '/register', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

        // handle the callback after facebook has authenticated the user
        app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

    // twitter --------------------------------

        // send to twitter to do the authentication
        app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

        // handle the callback after twitter has authenticated the user
        app.get('/auth/twitter/callback',
            passport.authenticate('twitter', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

        // the callback after google has authenticated the user
        app.get('/auth/google/callback',
            passport.authenticate('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));


// AUTHORIZE
// =============================================================================

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

        // handle the callback after facebook has authorized the user
        app.get('/connect/facebook/callback',
            passport.authorize('facebook', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

    // twitter --------------------------------

        // send to twitter to do the authentication
        app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

        // handle the callback after twitter has authorized the user
        app.get('/connect/twitter/callback',
            passport.authorize('twitter', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

        // the callback after google has authorized the user
        app.get('/connect/google/callback',
            passport.authorize('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));


// UNLINK ACCOUNTS 
// =============================================================================


    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/pages/profile');
        });
    });

    // facebook -------------------------------
    app.get('/unlink/facebook', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/pages/profile');
        });
    });

    // twitter --------------------------------
    app.get('/unlink/twitter', isLoggedIn, function(req, res) {
        var user           = req.user;
        user.twitter.token = undefined;
        user.save(function(err) {
            res.redirect('/pages/profile');
        });
    });

    // google ---------------------------------
    app.get('/unlink/google', isLoggedIn, function(req, res) {
        var user          = req.user;
        user.google.token = undefined;
        user.save(function(err) {
            res.redirect('/pages/profile');
        });
    });



  //export app
//  module.exports = app;

//==================================================================================
  
  //client routes
  //define routes
  
  //layout routs
  app.get('/login', layoutController.showLogin); 
     
  // logout
  app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
  //register routes
  app.get('/register', registerController.showRegister);
  //app.post('/register', registerController.processRegister);

  //main routes
  app.get('/', mainController.showProducts);
  app.post('/send', mainController.sendRequest);

  //contact routes
  app.get('/contact', contactController.showContact);
  app.post('/sendContact', contactController.sendRequest);

  //medical products routes
  app.get('/medicalProduct', medicalProductController.showMedicalProducts);
  app.get('/medical%20product/get', medicalProductController.showMedicalProducts);
  app.get('/medicalProduct/:slug/add', medicalProductController.addToCart);

  //medical equipment routes
  app.get('/medicalEquipment', medicalEquipmentController.showMedicalEquipment);
  app.get('/medical%20equipment/get', medicalEquipmentController.showMedicalEquipment);
  app.get('/medicalEquipment/:slug/add', medicalEquipmentController.addToCart);

  //medical furniture routes
  app.get('/medicalFurniture', medicalFurnitureController.showMedicalFurniture);
  app.get('/medical%20furniture/get', medicalFurnitureController.showMedicalFurniture);
  app.get('/medicalFurniture/:slug/add', medicalFurnitureController.addToCart);

  //training & simulation equipment routes
  app.get('/trainingandSimulationEquipment', trainingandSimulationEquipmentController.showTrainingandSimulationEquipment);
  app.get('/trainingand%20equipment/get', trainingandSimulationEquipmentController.showTrainingandSimulationEquipment);
  app.get('/trainingandSimulationEquipment/:slug/add', trainingandSimulationEquipmentController.addToCart);

  //first aid kits routes
  app.get('/firstAidKits', firstAidKitsController.showFirstAidKits);
  app.get('/firstAidKits/get', firstAidKitsController.showFirstAidKits);
  app.get('/firstAidKits/:slug/add', firstAidKitsController.addToCart);

 
  //equipment CPR & first aid routes
  app.get('/equipmentCPRFirstAid', equipmentCPRFirstAidController.showEquipmentCPRFirstAid);
  app.get('/equipment%20cpr/get', equipmentCPRFirstAidController.showEquipmentCPRFirstAid);
  app.get('/equipmentCPRFirstAid/:slug/add', equipmentCPRFirstAidController.addToCart);

  //online course routes
  app.get('/onlineCourse', onlineCourseController.showOnlineCourse);

  //about routes
  app.get('/about', aboutController.showAbout);

  //4 hour courses routes
  app.get('/4hCourse', fHCourseController.show4hCourse);

  //8 hour courses routes
  app.get('/8hCourse', eHCourseController.show8hCourse);

  //22 hour courses routes
  app.get('/22hCourse', ttHCourseController.show22hCourse);
     
  //28 hour courses routes
  app.get('/28hCourse', thHCourseController.show28hCourse);

  //44 hour courses routes
  app.get('/44hCourse', ffHCourseController.show44hCourse);

  //60 hour courses routes
  app.get('/60hCourse', sHCourseController.show60hCourse);

  //4 hour baby courses routes
  app.get('/4hBabyCourse', fHBabyCourseController.show4hBabyCourse);

  //medical teams courses routes
  app.get('/medicalTeamsCourse', medicalTeamsCourseController.showMedicalTeamsCourse);

  //paramedic courses routes
  app.get('/paramedicCourse', paramedicCourseController.showParamedicCourse);

  //approvals routes
  app.get('/approvals', approvalsController.showApprovals);

  //recommendation routes
  app.get('/recommendation', recommendationController.showRecommendation);

  //cart routes
  app.get('/cart', cartController.showProducts);

  //delete product
  app.get('/cart/:slug/delete', cartController.deleteProduct);

//  //show a single product
//  app.get('/cart/:slug', cartController.showSingle);

//====================================================================================

//admin routes
//main routes
app.get('/login_admin', loginAdminController.showPage);
app.get('/main_admin', loginAdminController.showMainPage);    

     
//process the login form
app.post('/adminlogin', passport.authenticate('local-login', {
    successRedirect : '/main_admin', // redirect to the secure profile section
    failureRedirect : '/login_admin', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));


//add product 
app.get('/admin_addProduct', addProductdAdminController.addProduct);
app.post('/addNewProduct', addProductdAdminController.processCreate);

//show product 
app.get('/admin_productsList',  productsListAdminController.showProductsList);
app.post('/displayProduct',  productsListAdminController.showProducts);
app.get('/deleteProduct/:slug/delete',  productsListAdminController.deleteProduct);
     
//update product 
//app.get('/admin_updateProductDetails', loginAdminController.updateProductDetails);
app.get('/updateProduct/:slug/update', updateProductAdminController.showUpdateProduct);
app.post('/admin_updateProduct/:slug', updateProductAdminController.updateProduct);    
     
//user list
app.get('/admin_userlist', userListAdminController.showUserList);
app.get('/deleteUser/:username/delete', userListAdminController.deleteUser);

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

//     return next();
    res.redirect('/');
}
