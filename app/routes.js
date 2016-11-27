// create a new express router
const express = require('express'),
  router = express.Router(),

  layoutController = require('./controllers/layout.controller'),
  mainController = require('./controllers/main.controller'),
  contactController = require('./controllers/contact.controller'),
  aboutController = require('./controllers/about.controller');
  coursesController = require('./controllers/courses.controller');
  approvalsController = require('./controllers/approvals.controller');
  recommendationController = require('./controllers/recommendation.controller');
  cartController = require('./controllers/cart.controller');
  medicalProductsController = require('./controllers/medicalProducts.controller');
  onlineCourseController = require('./controllers/onlineCourse.controller');

// export router
module.exports = router;


// define routes
//layout routs
//app.get('/login', routes.login);
router.get('/login', layoutController.showLogin);
//
//app.get('/register', routes.register);
router.get('/register',      layoutController.showRegister);
router.post('/register',     layoutController.processRegister);


// main routes
router.get('/', mainController.showMain);
router.get('/main', mainController.showMain);

// contact routes
router.get('/contact', contactController.showContact);

// medical products routes
router.get('/medicalProducts', medicalProductsController.showMedicalProducts);

// online course routes
router.get('/onlineCourse', onlineCourseController.showOnlineCourse);

//about routes
router.get('/about' , aboutController.showAbout);

//courses routes
router.get('/courses' , coursesController.showCourses);

//approvals routes
router.get('/approvals' , approvalsController.showApprovals);

//recommendation routes
router.get('/recommendation' , recommendationController.showRecommendation);

//cart routes
router.get('/cart', cartController.showProducts);

// seed products
router.get('/cart/seed' ,  cartController.seedProducts);

// create product
router.get('/cart/create',  cartController.showCreate);
router.post('/cart/create', cartController.processCreate);

// edit product
router.get('/cart/:slug/edit', cartController.showEdit);
router.post('/cart/:slug',     cartController.processEdit);

// delete product
router.get('/cart/:slug/delete', cartController.deleteProduct);

// show a single product
router.get('/cart/:slug', cartController.showSingle);