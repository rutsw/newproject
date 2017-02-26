  //create a new express router
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
  medicalEquipmentController = require('./controllers/medicalEquipment.controller'),
  medicalProductController = require('./controllers/medicalProduct.controller'),
  medicalFurnitureController = require('./controllers/medicalFurniture.controller'),
  equipmentCPRandFirstAidController = require('./controllers/equipmentCPRandFirstAid.controller'),
  trainingandSimulationEquipmentController = require('./controllers/trainingandSimulationEquipment.controller'),
  firstAidKitsController = require('./controllers/firstAidKits.controller'),
  onlineCourseController = require('./controllers/onlineCourse.controller'),

  //admin controllers
  mainadminController = require('./admin/main_admin.controller');

  //export router
  module.exports = router;

//==================================================================================
  
  //client routes
  //define routes
  //layout routs
  router.get('/login', layoutController.showLogin);
  
  //register routes
  router.get('/register', registerController.showRegister);
  router.post('/register', registerController.processRegister);

  //main routes
  router.get('/', mainController.showProducts);
  router.post('/send', mainController.sendRequest);

  //contact routes
  router.get('/contact', contactController.showContact);
  router.post('/sendContact', contactController.sendRequest);

  //medical products routes
  router.get('/medicalProduct', medicalProductController.showMedicalProducts);
  router.get('/medicalProduct/:slug/add', medicalProductController.addToCart);

  //medical equipment routes
  router.get('/medicalEquipment', medicalEquipmentController.showMedicalEquipment);

  //medical furniture routes
  router.get('/medicalFurniture', medicalFurnitureController.showMedicalFurniture);

  //training & simulation equipment routes
  router.get('/trainingandSimulationEquipment', trainingandSimulationEquipmentController.showTrainingandSimulationEquipment);

  //first aid kits routes
  router.get('/firstAidKits', firstAidKitsController.showFirstAidKits);

  //equipment CPR & first aid routes
  router.get('/equipmentCPRandFirstAid', equipmentCPRandFirstAidController.showeEquipmentCPRandFirstAid);

  //online course routes
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

  //seed products
  router.get('/cart/seed', cartController.seedProducts);

  //create product
  router.get('/cart/create', cartController.showCreate);
  router.post('/cart/create', cartController.processCreate);

  //edit product
  router.get('/cart/:slug/edit', cartController.showEdit);
  router.post('/cart/:slug', cartController.processEdit);

  //delete product
  router.get('/cart/:slug/delete', cartController.deleteProduct);

  //show a single product
  router.get('/cart/:slug', cartController.showSingle);

//====================================================================================

  //admin routes
  //main routes
  router.get('/admin/main_admin', mainadminController.showPage);
