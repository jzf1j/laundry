var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
    id: String,
	username: {type:String,unique: true},//email
	password: String,
	role:{
		type: String,
		enum: ['admin','editor','author','contributor','subscriber'],
		default:'subscriber'
	 },//admin,editor,author,contributor,subscriber
	displayName: String,
	user_joined_date:  {type: Date,default: Date.now}
},{
    collection: 'user'
});

module.exports = mongoose.model('User', user);