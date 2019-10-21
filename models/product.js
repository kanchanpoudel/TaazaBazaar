var mongoose = require ('mongoose');
const ProductSchema = mongoose.Schema({name:String, 
Seller:String,
vegetable:Boolean,
fruit:Boolean,
poultry:Boolean,
seeds:Boolean,

})
module.exports = mongoose.model('SellerProfile', SellerProfileSchema)