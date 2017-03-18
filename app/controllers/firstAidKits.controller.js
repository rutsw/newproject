const Product   = require('../models/product');
const Cart      = require('../models/cart');
const Recengine = require('../models/recengine');

module.exports = {
  showFirstAidKits: showFirstAidKits,
  addToCart:addToCart
}


// show the first aid kits page
function showFirstAidKits(req, res){
    
    var userstat_si_so="<a class=\"index\" id=\"signin\" href=\"/login\">התחבר</a>";
    var userstat_su_un="<a class=\"index\" id=\"signup\" href=\"/register\">הרשם/</a>";
    
    //check if the user is conected
    if (req.isAuthenticated()){
        userstat_su_un = " שלום, "+req.user.local.username;
        userstat_si_so = "<a class=\"index\" id=\"signout\" href=\"/logout\">/התנתק</a>";
        
        res.render('pages/firstAidKits', {userstat_su_un:userstat_su_un ,userstat_si_so:userstat_si_so});
    }
      
    // return a view with data in case user didn't connect
    else{
        
        res.render('pages/firstAidKits', { userstat_su_un: userstat_su_un ,userstat_si_so:userstat_si_so  });
    }
    
}

/**
 * Add product to cart
 */
function addToCart(req,res){ 
    if (req.isAuthenticated()){
       Product.findOne({slug: req.params.slug},(err,product)=>{
              // add a product to cart
              const cart= new Cart({
                username: req.user.local.email,
                name: product.name,
                description: product.description,
                category: product.category,
                price: product.price,
                amount: product.amount,
                stockpile: product.stockpile,
                imgName: product.imgName
              });

              // save product
              cart.save((err) => {
                if (err)
                    req.flash('success', 'Successfuly add new product to user cart!');
    //              throw err;

              // set a successful flash message
              req.flash('success', 'Successfuly add new product!');

       //************* Recommendation******************** 


                // if the user didn't add that product before     
               Recengine.find({username:req.user.local.email , productName: product.name},(err, recegine)=>{
                        // add a recommendation to reqenging
                      const recengine= new Recengine({
                        username: req.user.local.email,
                        product: product.imgName,
                        productName: product.name
                      });


                      // save product
                      recengine.save((err) => {
                        if (err)
                            req.flash('success', 'Recommendation already exist!');

                      // set a successful flash message
                      req.flash('success', 'Successfuly add new recommendation!');
                      });
                });       
    //        }

            res.redirect(`/cart`);

           });
        });    
    }
    else{
        Product.findOne({slug: req.params.slug},(err,product)=>{ 
               // add a product to public cart
              const cart= new Cart({
                username: 'public',
                name: product.name,
                description: product.description,
                category: product.category,
                price: product.price,
                amount: product.amount,
                stockpile: product.stockpile,
                imgName: product.imgName
              });

              // save product
              cart.save((err) => {
                if (err)
                    req.flash('success', 'Successfuly add new product to public cart!');
    //              throw err;

              // set a successful flash message
              req.flash('success', 'Successfuly add new product!');
                  
             res.redirect(`/cart`);
               });
            });
        }    
}