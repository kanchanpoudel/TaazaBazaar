var express = require('express');
var router = express.Router();
var sellers= require('../models/seller')

router.get('/seller', function(req, res, next) {
  //res.render('movies', data);

  sellerProfiles.find().exec((err, sellerProfiles) =>
  {
  	console.log('seller...', sellerProfiles);

  	
  })
});
/* GET home page. */
router.get('/', function(req, res, next)
{
res.render('first');

})
router.get('/register', function(req, res, next)
{
res.render('register');

})
router.get('/edit', function(req, res, next)
{
res.render('edit');

})
router.get('/login', function(req, res, next)
{
res.render('login');

})




router.post('/Signup', async function(req, res, next){
	sellers.findOne({phone_no: req.body.phone_no},async function(err, seller)
		{
		if(seller)
		res.render('exists');


		else{
var productArr =[req.body.vegetables, req.body.fruits, req.body.poultry, req.body.SeedsandSaplings].filter(x => !! x)

			var seller = new sellers({name: req.body.name , loaction: req.body.location , phone_no:req.body.phone_no,
	password:req.body.password, description:req.body.description, products: productArr

})
	
try
{var promise =  seller.save();
  await promise;
  console.log('profile saved', seller)

  res.render('profile', {seller});
}
catch(err)
{
  console.log(err);
}
	}
})})





router.post('/authenticate', async function(req, res, next){

 sellers.findOne({phone_no: req.body.phone_no}, function(err, seller)
 	{
 		console.log(seller);
 		if(seller && seller.name === req.body.name)


 		{
 			console.log('User found '); 

 			if(seller && seller.name === req.body.name && seller.password === req.body.password)
 				{console.log("password matched")
 			res.render('profile', {seller})
 		}
 			else
 				{
 					{console.log("password not matched")}
 			res.render('wrong')
 		}

 		}
 		else 
 				{console.log("user not matched")
 		res.render('wrong')}
 			
 		

 	})

	
}

)










module.exports = router;
