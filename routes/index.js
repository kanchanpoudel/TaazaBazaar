var express = require('express');
var router = express.Router();
var path = __dirname + '/views/'
var sellers= require('../models/seller')
var products= require('../models/product')
var orders= require('../models/order')
var multer= require('multer')
var bcrypt = require('bcryptjs')
var passport =require('passport')





router.get('/seller', function(req, res, next) {


  sellerProfiles.find().exec((err, sellerProfiles) =>
  {
  	console.log('seller...', sellerProfiles);

  	
  })
});
const auth = (req, res, next) => {
  if(req.isAuthenticated()){
    next()
  }
  else{
    console.log("skjnjdsnjdnjsdfjsdfjkdsnfkjds")
    res.redirect("/")
  }
}
/* GET home page. */
router.get('/', function(req, res, next)
{
  console.log(req.isAuthenticated())
res.render('first');
})


router.get('/confirm', function(req, res, next)
{
res.render('confirm');
})

router.get('/profile', auth, function(req, res, next)
{
res.render('profile', {user});
})


router.get('/register', function(req, res, next)
{
res.render('register');


})



router.get('/buylist', function(req, res, next)
{
products.find().exec((err, products) =>
  {
    console.log('products...', products);
    res.render('buylist', {products})
  })

})

router.get('/fruitsList', function(req, res, next)
{
products.find().exec((err, products) =>
  {
    console.log('products...', products);
    res.render('fruitsList', {products})
  })

})
router.get('/vegetablesList', function(req, res, next)
{
products.find().exec((err, products) =>
  {
    console.log('products...', products);
    res.render('vegetablesList', {products})
  })

})
router.get('/seedsList', function(req, res, next)
{
products.find().exec((err, products) =>
  {
    console.log('products...', products);
    res.render('seedsList', {products})
  })

})
router.get('/poultryList', function(req, res, next)
{
products.find().exec((err, products) =>
  {
    console.log('products...', products);
    res.render('poultryList', {products})
  })

})



router.get('/login', function(req, res, next)
{
res.render('login');

})




router.post('/order', async function(req, res, next){
 

  products.findOne({_id: req.body._id},async function(err, product)
    {
   
  
var order = new orders({Seller_id:product.Seller_Id, 
Product_id:req.body._id,
Name:req.body.Name,
Phone:req.body.Phone_no,
Amount:req.body.Amount,
Location:req.body.Location,
Time:req.body.Time


})
try
{var promise =  order.save();
  await promise;
}
catch(err)
{
  console.log(err);
}

sellers.findOneAndUpdate({_id: product.Seller_Id}, {$push: {requests: order}}, function(err, seller)
      {
      
        
  res.render('buylist')
        
  
  })


}
)

})



router.get('/confirm/:_id',  function(req,res, next )    
  {
    
      orders.findOne({_id: req.params._id}, function(err, order)
      {

        res.render('confirm', {order}); })
    });



router.get('/confirmed/:_id',  function(req,res, next )    
  {
    
      orders.findOneAndDelete({_id: req.params._id}, function(err, order)
      {

products.findOneAndDelete({_id:order.Product_id}, function(err, order)
  {
    console.log("deleted")
  });
  sellers.findOneAndUpdate({"_id":order.Seller_id},{$pull:{"requests":{"_id":order._id}}}) 



  
    

        
    });
    });









router.get('/edit/:_id',  function(req,res, next )    
  {
    
      sellers.findOne({_id: req.params._id}, function(err, seller)
      {

        res.render('edit', {seller}); })
    });



      router.get('/add/:_id',  function(req,res, next )    
  {
    
      sellers.findOne({_id: req.params._id}, function(err, seller)
      {

        res.render('add', {seller}); })
    
  })

router.get('/each/:_id',  function(req,res, next )    
  {
    
      products.findOne({_id: req.params._id}, function(err, product)
      {
 console.log(product)
        res.render('singleProduct', {product} );
    
  })
    })


router.post('/Signup', async function(req, res, next){
	sellers.findOne({phone_no: req.body.phone_no},async function(err, seller)
		{
		if(seller)
		res.render('exists');


		else{
var productArr =[req.body.vegetables, req.body.fruits, req.body.poultry, req.body.SeedsandSaplings].filter(x => !! x)

			var seller = new sellers({name: req.body.name , location: req.body.location , phone_no:req.body.phone_no,
	password:req.body.password, description:req.body.description, products: productArr

})


	
try

{

const salt = await bcrypt.genSaltSync();
 const hash = await  bcrypt.hashSync(req.body.password, salt);
seller.password = hash;

  var promise =  seller.save();
  await promise;
  console.log('profile saved', seller)

  res.redirect('login');
}
catch(err)
{
  console.log(err);
}
	}
})})

var storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(null, req.body.name+ '-' + Date.now() )
  }
})

var Upload = multer({ storage: storage }).single('file');










router.post('/Add', Upload, async function(req, res, next){



  var data = {Name: req.body.name ,Type: req.body.type, Description: req.body.description, Price:req.body.price , Seller:req.body.seller,Seller_Id:req.body._id, Image:"/uploads/"+req.file.filename }
var product = new products(data)
try
{var promise =  product.save();
  await promise;
  
 sellers.findOneAndUpdate({_id: req.body._id}, {$push: {nowSelling: data}}, function(err, seller)
      {
      
        products.find().exec((err, products) =>
  {
  
    res.render('add', {seller})
  })
        
  
  })
}
catch(err)
{
  console.log(err);
}
})




router.post('/updateSeller',  function(req,res, next )
  { console.log(req.body);
      sellers.findOneAndUpdate({_id: req.body._id}, {$set: req.body}, function(err, seller)
      {
        res.render('buylist', {seller})
        
  
  })
    }) 
router.post('/add',  function(req,res, next )
  { console.log(req.body);
      sellers.findOne({_id: req.body._id}, function(err, seller)
      {
        res.render('profile', {seller})
        
    
  })
    })
router.post('/authenticate',
  passport.authenticate('local',{session: false}),
  function(req, res) {

console.log("*************************", req.isAuthenticated())

    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
 seller= req.user||null;
  
    res.render('profile',{seller} );
  });




/*router.post('/authenticate', async function(req, res, next){

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
*/




module.exports = router;
