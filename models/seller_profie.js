var mongoose = require ('mongoose');
const SellerProfileSchema = mongoose.Schema({name:String, 
location:String,
products: String,


})
module.exports = mongoose.model('SellerProfile', SellerProfileSchema)