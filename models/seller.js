var mongoose = require ('mongoose');
const ProfileSchema = new mongoose.Schema({name:String, 
	phone_no:String,
	password: String,
location:String,
products: Object,
description:String,
reviews: Array,
nowSellig:Array

})
module.exports = mongoose.model('Profiles', ProfileSchema)