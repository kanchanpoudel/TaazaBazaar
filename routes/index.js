var express = require('express');
var router = express.Router();
var Seller= require('../models/seller')

router.get('/seller', function(req, res, next) {
  //res.render('movies', data);

  Seller.find().exec((err, sellerProfile) =>
  {
  	console.log('seller...', sellerProfile);

  	
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







module.exports = router;
