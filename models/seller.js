var mongoose = require ('mongoose');
const ProfileSchema = new mongoose.Schema({name:String, 
	username:String,
	password: String,
location:String,
products: Array,
description:String,
reviews: Array,
nowSelling:Array,
requests:Array

})
module.exports = mongoose.model('Profiles', ProfileSchema)