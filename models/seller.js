var mongoose = require ('mongoose');
const SellerProfileSchema = new mongoose.Schema({name:String, 
location:String,
products: Object,
Description:String,
Reciews: Array,
NowSellig:Array

})
module.exports = mongoose.model('sellerProfiles', SellerProfileSchema)