const Product = require('../models/cart');
const Recengine = require('../models/recengine');
const Suggestion = require('../models/suggestions');
const async = require('async');


module.exports = {
  showProducts: showProducts,
  showSingle: showSingle,
//  seedProducts: seedProducts,
  showCreate: showCreate,
  processCreate: processCreate,
  showEdit: showEdit,
  processEdit: processEdit,
  deleteProduct: deleteProduct,
  seedSuggestions: seedSuggestions
    
}

/**
 * Show all products
*/
function showProducts(req, res) {
    
    var userstat_si_so="<a class=\"index\" id=\"signin\" href=\"/login\">התחבר</a>";
    var userstat_su_un="<a class=\"index\" id=\"signup\" href=\"/register\">הרשם</a>"+" | ";
    var suggestions = "";
    var title = "";
    
          
        //check if the user is conected
        if (req.isAuthenticated()){

            userstat_su_un = " שלום "+req.user.local.username+" | ";
            userstat_si_so = "<a class=\"index\" id=\"signout\" href=\"/logout\">התנתק</a>";
            title ="מומלץ בשבילך..."
 
              // get all products   
              Product.find({username: req.user.local.email}, (err, products) => {
                if (err) {
                  res.status(404);
                  res.send('Products not found!');
                  }
                  
                  Suggestion.find({username: req.user.local.email}, (err, suggestions) => {
                if (err) {
                  res.status(404);
                  res.send('Products not found!');
                  }
//                   res.json(suggestions);
                   
                            
                 res.render('pages/cart', { products: products, suggestions:suggestions, title:title,  userstat_su_un:userstat_su_un,userstat_si_so:userstat_si_so});
              });
//            }
          }); 
//        });
        } // return a view with data in case user didn't connect
        else{
            
            // get all products   
              Product.find({username:'public'}, (err, products) => {
                if (err) {
                  res.status(404);
                  res.send('Products not found!');
                  }
                  
                res.render('pages/cart', { products: products,suggestions:suggestions, title:title,
                                          userstat_su_un:userstat_su_un ,userstat_si_so:userstat_si_so});
                
           });

        }   
      
}

/**
 * Show a single product
 */
function showSingle(req, res) {
  // get a single product
  Product.findOne({ slug: req.params.slug }, (err, product) => {
    if (err) {
      res.status(404);
      res.send('product not found!');
    }

    res.render('pages/single', { product: product });
  });
}

///**
// * Seed the database
// */
//function seedProducts(req, res) {
//  // create some products
//  const products = [
//    { name: 'Plasters', description: '100 NIS.' },
//    { name: 'Defibrilator', description: '800 NIS, SELF PICKUP.' },
//    { name: 'Rescue Bag', description: '1000 NIS, FREE SHIPMENT' }
//    ];
//
//  // use the Product model to insert/save
//  Product.remove({}, () => {
//    for (product of products) {
//      var newProduct = new Product(product);
//      newProduct.save();
//    }
//  });
//
//  // seeded!
//  res.send('Database seeded!');
//}


/////////////////////////////////////////////////////////////////////

/**
 * Show the create form
 */
function showCreate(req, res) {
  res.render('pages/create', {
    errors: req.flash('errors')
  });
}

/**
 * Process the creation form
 */
function processCreate(req, res) {
  // validate information
  req.checkBody('name', 'Name is required.').notEmpty();
  req.checkBody('description', 'Description is required.').notEmpty();

  // if there are errors, redirect and save errors to flash
  const errors = req.validationErrors();
  console.log(errors);
  if (errors) {
    req.flash('errors', errors.map(err => err.msg));
    return res.redirect('/cart/create');
  }

  // add a new product
  const product = new Product({
    name: req.body.name,
    description: req.body.description
  });

  // save product
product.save((err) => {
    if (err)
      throw err;

    // set a successful flash message
    req.flash('success', 'Successfuly created new product!');

    // redirect to the newly created product
   // res.redirect(`/cart/${product.slug}`);
    res.redirect(`/cart`);
  });
}

/**
 * Show the edit form
 */
function showEdit(req, res) {
  Product.findOne({ slug: req.params.slug }, (err, product) => {
    res.render('pages/edit', {
      product: product,
      errors: req.flash('errors')
    });
  })
}

/**
 * Process the edit form
 */
function processEdit(req, res) {
  // validate information
  req.checkBody('name', 'Name is required.').notEmpty();
  req.checkBody('description', 'Description is required.').notEmpty();

  // if there are errors, redirect and save errors to flash
  const errors = req.validationErrors();
  if (errors) {
    req.flash('errors', errors.map(err => err.msg));
    return res.redirect(`/cart/${req.params.slug}/edit`);
  }

  // finding a current product
  Product.findOne({ slug: req.params.slug }, (err, product) => {
    // updating that product
    product.name        = req.body.name;
    product.description = req.body.description;

    product.save((err) => {
      if (err)
        throw err;

      // success flash message
      // redirect back to the /cart
      req.flash('success', 'Successfully updated product.');
      res.redirect('/cart');
    });
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
    res.redirect('/cart');
  });
}

/**
 * Seed the database
 */
function seedSuggestions(req, res) {
    // seed the suggestion db
    fs = require('fs');
    fs.readFile('data/db-suggestions.json', 'utf8', function (err,suggestions) {
      if (err) {
        return console.log(err);
      }
          
         var arrays = JSON.parse(suggestions);
          // use the Product model to insert/save
          Suggestion.remove({}, () => {
            for (array of arrays) {
              var newSuggestion = new Suggestion(array);
              newSuggestion.save();
            }
          });

  // seeded!
  res.redirect('/cart');

  });       
}