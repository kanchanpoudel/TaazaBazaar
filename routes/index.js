var express = require('express');
var router = express.Router();
var sellerProfiles= require('../models/seller')

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



router.post('/Signup', async function(req, res, next){console.log(req.body)
var seller = new sellerProfiles({name: req.body.name , loaction: req.body.location , phone_no:req.body.phone_no,
	password:req.body.password, description:req.body.description 

})
	
try
{var promise =  seller.save();
  await promise;
  console.log('profile saved', seller)

  res.redirect('/edit')
}
catch(err)
{
  console.log(err);
}
})







module.exports = router;
