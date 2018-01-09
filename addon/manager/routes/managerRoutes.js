var express = require('express');
var config = require.main.require('./config');
var managerRouter = express.Router();
var order_path = '/manager_penel';
var session = require('express-session');

// Authentication and Authorization Middleware
var fj_auth = function(req, res, next) {
    if (req.session && req.session.manager === config.manager_name && req.session.manager_admin)
      return next();
    else
      return res.sendStatus(401);
  };



managerRouter.get('/', function(req, res) {
    //console.log(login_path);
    
    // Display the Login page with any flash message, if any
    res.render('manager/manager_index',{ user: req.user});
});
// Login endpoint
managerRouter.get('/login', function (req, res) {
    if (!req.query.username || !req.query.password) {
      res.send('login failed');    
    } else if(req.query.username === config.manager_name && req.query.password === config.manager_pw) {
      req.session.manager = config.manager_name;
      req.session.manager_admin = true;
      res.redirect('/manager_penel/products');
    }else{
      res.send('login failed');
    }
  });
   
  // Logout endpoint
managerRouter.get('/logout', function (req, res) {
    req.session.destroy();
    res.send("logout success!");
  });
   
  // Get content endpoint
// managerRouter.get('/content', auth, function (req, res) {
//       res.send("You can only see this after you've logged in.");
//   });

// managerRouter.get('/products', auth, function (req, res) {
//     res.render('manager/product/products');
// });

module.exports = managerRouter;



