var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orders = new Schema({
    order_author: String,
    order_author_id:{ type: Schema.Types.ObjectId, ref: 'User' },
    order_date:  {type: Date,default: Date.now},// `Date.now()` returns the current unix timestamp as a number
    order_update_date:{type: Date,default: Date.now},
    order_title: {type: String,default:'pickup aundrary'},
    order_status: {
		type: String,
		enum: ['comfirm','pickuped','delivered'],
		default:'comfirm'
     },
     order_phone: String,
     order_pickup_date: String,
     order_pickup_time: String,
     order_return_date: String,
     order_return_time: String,
     order_weight_class: String,
     order_address: String,
     order_content: String,
     order_products:[{ type: Schema.Types.ObjectId, ref: 'Products' }],
     order_total: String
},{
    collection: 'orders'
});

module.exports = mongoose.model('Orders', orders);