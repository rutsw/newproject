// create a new express router
const express = require('express'),
  router = express.Router(),

  layoutController = require('./controllers/layout.controller'),
  registerController = require('./controllers/register.controller'),
  mainController = require('./controllers/main.controller'),
  contactController = require('./controllers/contact.controller'),
  aboutController = require('./controllers/about.controller'),
  coursesController = require('./controllers/courses.controller'),
  approvalsController = require('./controllers/approvals.controller'),
  recommendationController = require('./controllers/recommendation.controller'),
  cartController = require('./controllers/cart.controller'),
  medicalProductsController = require('./controllers/medicalProducts.controller'),
  onlineCourseController = require('./controllers/onlineCourse.controller');

  // export router
  module.exports = router;

  // define routes
  //layout routs
  router.get('/login', layoutController.showLogin);
  //
  //register routes
  router.get('/register', registerController.showRegister);
  router.post('/register', registerController.processRegister);


  // main routes
  router.get('/', mainController.showProducts);
  router.post('/send', mainController.sendRequest);
  //router.get('/main/{firstname}', mainController.showName);

  // contact routes
  router.get('/contact', contactController.showContact);
  router.post('/send', contactController.sendRequest);

  // medical products routes
  router.get('/medicalProducts', medicalProductsController.showMedicalProducts);
  router.get('/medicalProducts/:slug/add', medicalProductsController.addToCart);

  // online course routes
  router.get('/onlineCourse', onlineCourseController.showOnlineCourse);

  //about routes
  router.get('/about', aboutController.showAbout);

  //courses routes
  router.get('/courses', coursesController.showCourses);

  //approvals routes
  router.get('/approvals', approvalsController.showApprovals);

  //recommendation routes
  router.get('/recommendation', recommendationController.showRecommendation);

  //cart routes
  router.get('/cart', cartController.showProducts);

  // seed products
  router.get('/cart/seed', cartController.seedProducts);

  // create product
  router.get('/cart/create', cartController.showCreate);
  router.post('/cart/create', cartController.processCreate);

  // edit product
  router.get('/cart/:slug/edit', cartController.showEdit);
  router.post('/cart/:slug', cartController.processEdit);

  // delete product
  router.get('/cart/:slug/delete', cartController.deleteProduct);

  // show a single product
  router.get('/cart/:slug', cartController.showSingle);