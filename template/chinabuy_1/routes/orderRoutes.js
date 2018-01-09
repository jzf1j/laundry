var express = require('express');
var config = require.main.require('./config');
var Order = require.main.require('./addon/manager/models/orderModel');
var Products = require.main.require('./addon/manager/models/productsModel');
var orderRouter = express.Router();
var order_path = '/order';

orderRouter.get('/place_order', function(req, res) {
    //console.log(login_path);
    
    // Display the Login page with any flash message, if any
    Products.find(function (err, result_products){
        if(err){return console.log(err);}
         res.render(config.template+'/order/place_order',{ user: req.user,itms_products:result_products});
    });
});
orderRouter.get('/history', function(req, res) {
    //console.log(login_path);
    
    // Display the Login page with any flash message, if any
    res.render(config.template+'/order/history',{ user: req.user});
});
orderRouter.get('/comfirm/:id', function(req, res) {
    var id = req.params.id;
    Order.findById(id, function (err, result_order){
        res.render(config.template+'/order/comfirm',{ user: req.user,order:result_order});
    });
});
orderRouter.get('/oreder_detail/:id', function(req, res) {
    var id = req.params.id;
    Order.findById(id, function (err, result_order){
        res.render(config.template+'/order/single',{ user: req.user,order:result_order});
    });
});
orderRouter.route('/add_order').post(function (req, res) {
    var user_data = req.body;
    user_data.order_author = req.user.username;
    user_data.order_author_id = req.user._id;

    //console.log(user_data);
    var order = new Order(user_data);

    order.save()
      .then(item => {
    res.redirect(order_path+'/comfirm/'+item._id);
      })
      .catch(err => {
      res.status(400).send("unable to save to database");
      });
  });
module.exports = orderRouter;