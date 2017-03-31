// load environment variables
require('dotenv').config();

var Bourne, Engine, _, app, async, e, express, products, port , mongoose , Product ,Suggestion ,Recengine ,User;

_ = require('underscore');

async = require('async');

Bourne = require('bourne');

express = require('express');

mongoose = require('mongoose');
  mongoose.Promise = global.Promise;

products = require('./data/products.json');

Engine = require('./lib/engine');

User = require('./models/user.js');

Product = require('./models/product.js');

Suggestion = require('./models/suggestion.js');

Recengine = require('./models/recengine.js');

e = new Engine;

app = express();

app.set('views', __dirname + "/views");

app.set('view engine', 'jade');



//compute the algorithem fo each user
module.exports = compute =function(arg, res, next) {
  var query;
  query = arg.query;
  return async.series([
    (function(_this) {
      return function(done) {
        return e.similars.update(arg, done);
      };
    })(this), (function(_this) {
      return function(done) {
        return e.suggestions.update(arg, done);
      };
    })(this)
  ], (function(_this) {
    return function(err) {
      if (err != null) {
        return next(err);
      }
    };
  })(this));
}

app.route('/like').post(function(arg, res, next) {
  var query;
  query = arg.query;
  if (query.unset === 'yes') {
    return e.likes.remove(query.username, query.product, (function(_this) {
      return function(err) {
        if (err != null) {
          return next(err);
        }
        return res.redirect("/?username=" + query.username);
      };
    })(this));
  } else {
    return e.dislikes.remove(query.username, query.product, (function(_this) {
      return function(err) {
        if (err != null) {
          return next(err);
        }
        return e.likes.add(query.username, query.product, function(err) {
          if (err != null) {
            return next(err);
          }
          return res.redirect("/?username=" + query.username);
        });
      };
    })(this));
  }
});

app.route('/dislike').post(function(arg, res, next) {
  var query;
  query = arg.query;
  if (query.unset === 'yes') {
    return e.dislikes.remove(query.username, query.product, (function(_this) {
      return function(err) {
        if (err != null) {
          return next(err);
        }
        return res.redirect("/?username=" + query.username);
      };
    })(this));
  } else {
    return e.likes.remove(query.username, query.product, (function(_this) {
      return function(err) {
        if (err != null) {
          return next(err);
        }
        return e.dislikes.add(query.username, query.product, function(err) {
          if (err != null) {
            return next(err);
          }
          return res.redirect("/?username=" + query.username);
        });
      };
    })(this));
  }
});

app.route('/').get(function(arg, res, next) {
  var query;
  query = arg.query;
  return async.auto({
    likes: (function(_this) {
      return function(done) {
        return e.likes.itemsByUser(query.username, done);
      };
    })(this),
    dislikes: (function(_this) {
      return function(done) {
        return e.dislikes.itemsByUser(query.username, done);
      };
    })(this),
    suggestions: (function(_this) {
      return function(done) {
        return e.suggestions.forUser(query.username, function(err, suggestions) {
          if (err != null) {
            return done(err);
          }
          return done(null, _.map(_.sortBy(suggestions, function(suggestion) {
            return -suggestion.weight;
          }), function(suggestion) {
            return _.findWhere(products, {
              id: suggestion.product
            });
          }));
        });
      };
    })(this)
  }, (function(_this) {
    return function(err, arg1) {
      var dislikes, likes, suggestions;
      likes = arg1.likes, dislikes = arg1.dislikes, suggestions = arg1.suggestions;
      if (err != null) {
        return next(err);
      }
      return res.render('index', {
        products: products,
        username: query.username,
        likes: likes,
        dislikes: dislikes,
        suggestions: suggestions.slice(0, 4)
      });
    };
  })(this));
});

//get the current product list from the yosi amar web site
app.route('/update').get(function(arg, res, next){
    
    fs = require('fs');
     var array="";
             Product.find({},function(err, array){
                if (err) {
                  res.status(404);
                  res.send('recengines not found!');
                  } 
                  if(array){
                      array = JSON.stringify(array);
                      fs.writeFile('data/products.json', array , (err) => {
                                  if (err) throw err;
                           }); 
                    }

                  });
  res.redirect('/');
             
});

//get the likes from the yosi amar web site
app.route('/export').get(function(arg, res, next){
    
             var array="";
             fs = require('fs');
             Recengine.find({},function(err, array){
                if (err) {
                  res.status(404);
                  res.send('recengines not found!');
                  } 
                  if(array){
                      array = JSON.stringify(array);
                      fs.writeFile('db-likes.json', array , (err) => {
                                  if (err) throw err;
                           }); 
                    }

                  });
    
    res.redirect('/refresh');
    });

//run the compute function on the current list of users
app.route('/refresh').get(function(arg, res, next) {
  var query;
    
  User.find({},function(err, users){
            if (err) {
                  res.status(404);
                  res.send('users not found!');
                  } 
      var user="";
      var str="";
        for(user in users){
            
        if(users[user].local.isadmin!=true){
           
            compute(users[user].local.email); 

        } 
            
        } 
      
    });
    res.redirect('/seed')
});

//seed the suggestion into the database of the yosi amar website
app.route('/seed').get(function(arg, res, next){
    
    fs = require('fs');
    fs.readFile('db-suggestions.json', 'utf8', function (err,suggestions) {
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
  res.redirect('/');
  });           
});

//conect to the DB
mongoose.connect(process.env.DB_URI);


app.listen((port = 5000), function(err) {
  if (err != null) {
    throw err;
  }
  return console.log("Listening on " + port);
});

