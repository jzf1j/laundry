var config = require.main.require('./config');
// TODO - Why Do we need this key ? //secret: '2C44-4D44-WppQ38S',
// site.use(expressSession({secret: 'mySecretKey',resave: true,saveUninitialized: true}));

// Authentication and Authorization Middleware
var fj_auth = function(req, res, next) {
    if (req.session && req.session.manager === config.manager_name && req.session.manager_admin)
      return next();
    else
      return res.sendStatus(401);
  };

module.exports = function (site){
    

    var managerRoutes = require('./routes/managerRoutes');
    site.use('/manager_login', managerRoutes);

    site.use('/manager_penel',fj_auth);//put this before other 

    var productRoutes = require('./routes/productRoutes');
    site.use('/manager_penel/products', productRoutes);

    var productRoutes = require('./routes/userRoutes');
    site.use('/manager_penel/users', productRoutes);

    var orderRoutes = require('./routes/orderRoutes');
    site.use('/manager_penel/orders', orderRoutes);
}