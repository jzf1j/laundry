// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');
var flash = require('connect-flash');


module.exports = function (site){

    // TODO - Why Do we need this key ?
    site.use(expressSession({secret: 'mySecretKey',resave: true,saveUninitialized: true}));
    site.use(passport.initialize());
    site.use(passport.session());

    site.use(flash());


    // Initialize Passport
    var initPassport = require('./passport/init_passport');
    initPassport(passport);

    
    var routes = require('./routes/loginRoutes')(passport);
    site.use('/login', routes);
}