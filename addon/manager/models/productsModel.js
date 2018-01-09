var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var products = new Schema({
    
    product_name: {type: String},
    product_price: {type: String},
    product_description: {type: String},
    product_quantity: {type: Number,default:9999},
},{
    collection: 'products'
});

module.exports = mongoose.model('Products', products);