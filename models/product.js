var mongoose = require ('mongoose');
const ProductSchema = mongoose.Schema({
	Seller_Id:String,
	Type:String,
	Name:String, 
Seller:String,
Price:String,
Description:String,
Image:String,
Amount:String,
Avaialibility:Boolean

})
module.exports = mongoose.model('products', ProductSchema)