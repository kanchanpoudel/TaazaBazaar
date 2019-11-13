var mongoose = require ('mongoose');
const OrderSchema = mongoose.Schema({Seller_id:String, 
Product_id:String,
Name:String,
Phone:String,
Amount:String,
Location:String,
Time:String


})
module.exports = mongoose.model('orders', OrderSchema)