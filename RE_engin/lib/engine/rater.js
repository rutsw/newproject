var Bourne, Rater, _, async;

_ = require('underscore');

async = require('async');

Bourne = require('bourne');

//compute the likes and dislikes
module.exports = Rater = (function() {
  function Rater(engine, kind) {
    this.engine = engine;
    this.kind = kind;
    this.db = new Bourne("./db-" + this.kind + ".json");
  }

  Rater.prototype.add = function(username, product, done) {
    return this.db.find({
      username: username,
      product: product
    }, (function(_this) {
      return function(err, res) {
        if (err != null) {
          return done(err);
        }
        if (res.length > 0) {
          return done();
        }
        return _this.db.insert({
          username: username,
          product: product
        }, function(err) {
          if (err != null) {
            return done(err);
          }
          return async.series([
            function(done) {
              return _this.engine.similars.update(username, done);
            }, function(done) {
              return _this.engine.suggestions.update(username, done);
            }
          ], done);
        });
      };
    })(this));
  };

  Rater.prototype.remove = function(username, product, done) {
    return this.db["delete"]({
      username: username,
      product: product
    }, (function(_this) {
      return function(err) {
        if (err != null) {
          return done(err);
        }
        return async.series([
          function(done) {
            return _this.engine.similars.update(username, done);
          }, function(done) {
            return _this.engine.suggestions.update(username, done);
          }
        ], done);
      };
    })(this));
  };

  Rater.prototype.itemsByUser = function(username, done) {
    return this.db.find({
      username: username
    }, (function(_this) {
      return function(err, ratings) {
        if (err != null) {
          return done(err);
        }
        return done(null, _.pluck(ratings, 'product'));
      };
    })(this));
  };

  Rater.prototype.usersByItem = function(product, done) {
    return this.db.find({
      product: product
    }, (function(_this) {
      return function(err, ratings) {
        if (err != null) {
          return done(err);
        }
        return done(null, _.pluck(ratings, 'username'));
      };
    })(this));
  };

  return Rater;

})();
