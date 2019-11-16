var mongoose = require ('mongoose');
const ProfileSchema = new mongoose.Schema({name:String, 
	phone_no:String,
	password: String,
location:String,
requests:Array,
answers:Array

})
module.exports = mongoose.model('buyers', ProfileSchema)