const express = require('express');
// const app = express();
const mOrderRouter = express.Router();
//var admin_option = require('../models/admin_option');
var Products = require('../models/productsModel');
var Orders = require('../models/orderModel');
var order_url='/manager_penel/orders';



mOrderRouter.route('/').get(function (req, res) {
  Orders.find().populate('order_author_id').populate('order_products.buy_product')
  .sort({order_pickup_date: 1,order_pickup_time: 1}).exec(function(err, result_order) {
      if(err){return console.log(err);}
      //console.log(result_order[0].order_products[0].buy_product);
        res.render('manager/orders/orders', {order: result_order});
      
    });
});


mOrderRouter.route('/edit/:id').get(function (req, res) {
    var id = req.params.id;
    Orders.findById(id).populate('order_author_id').populate('order_products').exec(function(err, result_order) {
      Products.find(function (err, result_products){   
          if(err){return console.log(err);}
            res.render('manager/orders/editOrder', {item: result_order,itms_products:result_products}); 
      });
    });
});
mOrderRouter.route('/add').get((req, res)=>{
  Products.find(function (err, result_products){   
      if(err){return console.log(err);}
        res.render('manager/orders/addOrder', {itms_products:result_products}); 
  });
});
mOrderRouter.route('/add/order').post(function (req, res) {
    // console.log('post form: ');
    // console.log(req.body);
    var user_data = req.body;
    var orders = new Orders(user_data);
    orders.save()
      .then(posts => {
      res.redirect(order_url);
      })
      .catch(err => {
      res.status(400).send("unable to save to database");
      });
});
mOrderRouter.route('/update/:id').post(function (req, res) {
  Orders.findById(req.params.id, function(err, posts) {
      if (!posts)
        return next(new Error('Could not load Document'));
      else {
        // do your updates here
        // posts.product_name = req.body.product_name;
        // posts.product_price = req.body.product_price;
        // posts.product_description = req.body.product_description;
        // posts.product_quantity = req.body.product_quantity;
        for (var i in req.body) {
          posts[i] = req.body[i];
        }
        //const new_posts = Object.assign(req.body,posts);
        //console.log(posts.post_album_id);
        // console.log(posts);
        posts.save().then(item => {
            res.redirect(order_url);
        })
        .catch(err => {
              res.status(400).send("unable to update the database");
        });
      }
    });
  });
mOrderRouter.route('/delete/:id').get(function (req, res) {
  Orders.findByIdAndRemove({_id: req.params.id},
         function(err, item){
          if(err) res.json(err);
          else res.redirect(order_url);
      });
  });
module.exports = mOrderRouter;