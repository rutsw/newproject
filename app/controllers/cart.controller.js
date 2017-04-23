const Product = require('../models/cart');
const Recengine = require('../models/recengine');
const Suggestion = require('../models/suggestions');
const async = require('async');


module.exports = {
  showProducts: showProducts,
  showSingle: showSingle,
  deleteProduct: deleteProduct,
//  seedSuggestions: seedSuggestions
    
}

var products="";
var title = "";
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
           
 
              // get all products   
              Product.find({username: req.user.local.email}, (err, products) => {
                if (err) {
                  res.status(404);
                  res.send('Products not found!');
                  }
                  
                  Suggestion.find({username: req.user.local.email}, { suggestions: { $slice: 4 } }, (err, suggestions) => {
                if (err) {
                  res.status(404);
                  res.send('Products not found!');
                  }
                      if(suggestions!="")
                           title ="מומלץ בשבילך..."
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

/////////////////////////////////////////////////////////////////////


 // Delete an product
function deleteProduct(req, res) {
  Product.remove({ slug: req.params.slug}, (err) => {
    // set flash data
    // redirect back to the cart page
    req.flash('success', 'Product deleted!');
    res.redirect('/cart');
  });
}


//// Seed the database
// function seedSuggestions(req, res) {
//    // seed the suggestion db
//    fs = require('fs');
//    fs.readFile('data/db-suggestions.json', 'utf8', function (err,suggestions) {
//      if (err) {
//        return console.log(err);
//      }
//          
//         var arrays = JSON.parse(suggestions);
//          // use the Product model to insert/save
//          Suggestion.remove({}, () => {
//            for (array of arrays) {
//              var newSuggestion = new Suggestion(array);
//              newSuggestion.save();
//            }
//          });
//
//  // seeded!
//  res.redirect('/cart');
//
//  });       
//}