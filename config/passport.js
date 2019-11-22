const LocalStrategy = require ('passport-local').Strategy;
const seller = require ('../models/seller');
const config = require('../config/database');
const bcrypt = require ('bcryptjs');
var passport = require('passport')
module.exports = function(passport)
{ 
	
	passport.use(new LocalStrategy(function(username, password, done)
	{
		
		let query= {username:username};
		seller.findOne(query, function(err, user)
		{


			if (err) console.log(err);
			if(!user)
			{ 
				return done (null, false, {message:'no user found'});

			}
			bcrypt.compare(password.toString(), user.password.toString(), function(err, isMatch)
			{


				if (err) console.log(err);
				if(isMatch)
				{


					return done(null, user);

				}
				else 
				{
					return done(null, false, {message:'Wrong password'});
				}
			})
		})
	}))



}