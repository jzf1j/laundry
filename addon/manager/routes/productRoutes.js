const express = require('express');
// const app = express();
const postsRouter = express.Router();
//var admin_option = require('../models/admin_option');
var Products = require('../models/productsModel');
//var Orders = require('../models/orderModel');
var product_url='/manager_penel/products';



postsRouter.route('/').get(function (req, res) {
    Products.find(function (err, result){
      if(err){
        console.log(err);
      }
      else {
        // console.log(result);
        res.render('manager/products/products', {itms: result});
        
      }
    });
});


postsRouter.route('/edit/:id').get(function (req, res) {
    var id = req.params.id;
    Products.findById(id, function (err, result_post){
      
          if(err){return console.log(err);}
            res.render('manager/products/editProduct', {item: result_post}); 
      
    });
});
postsRouter.route('/add').get((req, res)=>{
    res.render('manager/products/addProduct');
});
postsRouter.route('/add/product').post(function (req, res) {
    // console.log('post form: ');
    // console.log(req.body);
    var user_data = req.body;
    var products = new Products(user_data);
    products.save()
      .then(posts => {
      res.redirect(product_url);
      })
      .catch(err => {
      res.status(400).send("unable to save to database");
      });
});
postsRouter.route('/update/:id').post(function (req, res) {
    Products.findById(req.params.id, function(err, posts) {
      if (!posts)
        return next(new Error('Could not load Document'));
      else {
        // do your updates here
        posts.product_name = req.body.product_name;
        posts.product_price = req.body.product_price;
        posts.product_description = req.body.product_description;
        posts.product_quantity = req.body.product_quantity;
        //console.log(posts.post_album_id);
        // console.log(posts);
        posts.save().then(item => {
            res.redirect(product_url);
        })
        .catch(err => {
              res.status(400).send("unable to update the database");
        });
      }
    });
  });
postsRouter.route('/delete/:id').get(function (req, res) {
    Products.findByIdAndRemove({_id: req.params.id},
         function(err, item){
          if(err) res.json(err);
          else res.redirect(product_url);
      });
  });
module.exports = postsRouter;