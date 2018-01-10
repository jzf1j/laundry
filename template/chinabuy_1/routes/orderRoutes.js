var express = require('express');
var config = require.main.require('./config');
var Order = require.main.require('./addon/manager/models/orderModel');
var Products = require.main.require('./addon/manager/models/productsModel');
var orderRouter = express.Router();
var order_path = '/order';


// var mailOptions = {
//   from: 'chinatownbuy.com@gmail.com',
//   to: 'jzf111j@gmail.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };




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
    Order.find({order_author:req.user.username}).sort({order_date: -1}).exec(function (err, result){
        if(err){
          console.log(err);
        }
        else {
        //    console.log(result);
          res.render(config.template+'/order/history',{ user: req.user,order:result});
          
        }
      });
});
orderRouter.get('/comfirm/:id', function(req, res) {
    var nodemailer = require('nodemailer');
    //https://www.google.com/settings/security/lesssecureapps
    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.system_email,
        pass: config.system_email_pw
    }
    });
    var id = req.params.id;
    Order.findById(id, function (err, result_order){
        transporter.sendMail({
            from: config.send_customer_email_from,
            to: req.user.username +', '+ config.send_customer_email_to,
            subject: 'we just receive your order',
            html: fj_mail_content(result_order)
          }, function(error, info){
          if (error) {console.log(error);} 
        });
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

function fj_mail_content(order){
    var text =  `<h2 >thanks, your laundry is been comfirm</h2>
    <p>please call 707-293-7762 if you have any question</p>
    <h4>order detail:</h4>
    <ul >
        <li>customer phone --->   ${order.order_phone }</li><br>

        <li>order date --->   ${ order.order_date.toDateString() }</li>
        <li>order title --->   ${ order.order_title }</li>
        <li>order status --->   ${ order.order_status }</li><br>
        
        <li>pickup date --->   ${ order.order_pickup_date }</li>
        <li>pickup time --->   ${ order.order_pickup_time }</li>
        <li>return date --->   ${ order.order_return_date }</li>
        <li>return time --->   ${ order.order_return_time }</li>
        <li>customer note --->   ${ order.order_content }</li><br>


        <li><b>order estimated total --->$  ${ order.order_total }</b></li>
        </ul>`;
    return text;
}