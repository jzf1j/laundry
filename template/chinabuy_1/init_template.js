var config = require.main.require('./config');
function fj_is_login  (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
    // Passport adds this method to request object. A middleware is allowed to add properties to
    
	// request and response objects
    if (req.isAuthenticated())   
		return next();
    // if the user is not authenticated then redirect him to the login page
    console.log('user no login');
	res.redirect('/');
}
module.exports = function(site){
    site.get('/',(req,res)=>{
        res.render(config.template+'/index');
    });

    var orderRoutes = require('./routes/orderRoutes');
    site.use('/order',fj_is_login);//put this before other 
    site.use('/order', orderRoutes);
   
    

    
}