var mongoose = require ('mongoose');
const ProductSchema = mongoose.Schema({
	Type:String,
	Name:String, 
Seller:String,
Price:String,
Description:String



})
module.exports = mongoose.model('products', ProductSchema)