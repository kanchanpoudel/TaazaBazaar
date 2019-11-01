var mongoose = require ('mongoose');
const ProductSchema = mongoose.Schema({
	Seller_Id:String,
	Type:String,
	Name:String, 
Seller:String,
Price:String,
Description:String



})
module.exports = mongoose.model('products', ProductSchema)