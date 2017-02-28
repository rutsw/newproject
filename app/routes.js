  //create a new express router
  const express = require('express'),
  router = express.Router(),

  //client controllers
  layoutController = require('./controllers/layout.controller'),
  registerController = require('./controllers/register.controller'),
  mainController = require('./controllers/main.controller'),
  contactController = require('./controllers/contact.controller'),
  aboutController = require('./controllers/about.controller'),
  coursesController = require('./controllers/courses.controller'),
  fHCourseController = require('./controllers/4hCourse.controller'),
  eHCourseController = require('./controllers/8hCourse.controller'),
  ttHCourseController = require('./controllers/22hCourse.controller'),
  ffHCourseController = require('./controllers/44hCourse.controller'),
  sHCourseController = require('./controllers/60hCourse.controller'),
  fHBabyCourseController = require('./controllers/4hBabyCourse.controller'),
  medicalTeamsCourseController = require('./controllers/medicalTeamsCourse.controller'),
  paramedicCourseController = require('./controllers/paramedicCourse.controller'),
  approvalsController = require('./controllers/approvals.controller'),
  recommendationController = require('./controllers/recommendation.controller'),
  cartController = require('./controllers/cart.controller'),
  onlineCourseController = require('./controllers/onlineCourse.controller'),
  medicalEquipmentController = require('./controllers/medicalEquipment.controller'),
  medicalProductController = require('./controllers/medicalProduct.controller'),
  medicalFurnitureController = require('./controllers/medicalFurniture.controller'),
  equipmentCPRandFirstAidController = require('./controllers/equipmentCPRandFirstAid.controller'),
  trainingandSimulationEquipmentController = require('./controllers/trainingandSimulationEquipment.controller'),
  firstAidKitsController = require('./controllers/firstAidKits.controller'),

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
  //router.get('/equipmentCPRandFirstAid', equipmentCPRandFirstAidController.showeEquipmentCPRandFirstAid);

  //online course routes
  router.get('/onlineCourse', onlineCourseController.showOnlineCourse);

  //about routes
  router.get('/about', aboutController.showAbout);

  //courses routes
  //router.get('/courses', coursesController.showCourses);

  //4 hour courses routes
  router.get('/4hCourse', fHCourseController.show4hCourse);

  //8 hour courses routes
  router.get('/8hCourse', eHCourseController.show8hCourse);

  //22 hour courses routes
  router.get('/22hCourse', ttHCourseController.show22hCourse);

  //44 hour courses routes
  router.get('/44hCourse', ffHCourseController.show44hCourse);

  //60 hour courses routes
  router.get('/60hCourse', sHCourseController.show60hCourse);

  //4 hour baby courses routes
  router.get('/4hBabyCourse', fHBabyCourseController.show4hBabyCourse);

  //medical teams courses routes
  router.get('/medicalTeamsCourse', medicalTeamsCourseController.showMedicalTeamsCourse);

  //paramedic courses routes
  router.get('/paramedicCourse', paramedicCourseController.showParamedicCourse);

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
// main routes
router.get('/main_admin', mainadminController.showPage);

//add product 
router.get('/admin_addProduct', mainadminController.addProduct);

//delete product 
router.get('/admin_deleteProduct', mainadminController.deleteProduct);

//update product 
router.get('/admin_updateProductDetails', mainadminController.updateProductDetails);

//delete product 
router.get('/admin_userlist', mainadminController.userlist);

