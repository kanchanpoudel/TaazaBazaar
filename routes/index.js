var express = require('express');
var router = express.Router();
var path = __dirname + '/views/'
var sellers= require('../models/seller')
var products= require('../models/product')
var orders= require('../models/order')
var multer= require('multer')
var bcrypt = require('bcryptjs')
var passport =require('passport')







const isauth = (req, res, next) => {
  if(req.isAuthenticated()){
    res.redirect('back')
  
    
  }
  else
    next()
  
}
/* GET home page. */
router.get('/home',auth, function(req, res, next)
{
  console.log("home");
res.render('first');
})
router.get('/', function(req, res, next)
{
 
res.render('first');
})
router.get('/logout', function(req, res, next)
{
 req.logout()
res.redirect('/home');
})

router.get('/wrong', function(req, res, next)
{
 
res.render('wrong');
})


router.get('/confirm', function(req, res, next)
{
res.render('confirm');
})

router.get('/profile', auth, function(req, res, next)
{
  sellers.findOne({_id:req.user},(err, seller) =>
  {
    

    res.render('profile',{seller});
  }
  )

})


router.get('/register', isauth, function(req, res, next)
{
res.render('register');


})
router.get('/blog', isauth, function(req, res, next)
{
res.render('blog');


})
router.get('/add',auth,  function(req, res, next)
{
res.render('add');


})
router.get('/edit',auth,  function(req, res, next)
{
res.render('edit');


})



router.get('/buylist',  function(req, res, next)
{
products.find().exec((err, products) =>
  {
    console.log('products...', products);
    res.render('buylist', {products})
  })

})

router.get('/fruitsList',  function(req, res, next)
{
products.find().exec((err, products) =>
  {
    console.log('products...', products);
    res.render('fruitsList', {products})
  })

})
router.get('/vegetablesList',  function(req, res, next)
{
products.find().exec((err, products) =>
  {
    console.log('products...', products);
    res.render('vegetablesList', {products})
  })

})
router.get('/seedsList',  function(req, res, next)
{
products.find().exec((err, products) =>
  {
    console.log('products...', products);
    res.render('seedsList', {products})
  })

})
router.get('/poultryList',  function(req, res, next)
{
products.find().exec((err, products) =>
  {
    console.log('products...', products);
    res.render('poultryList', {products})
  })

})



router.get('/login',isauth,  function(req, res, next)
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
Time:req.body.Time,
ProName:req.body.proName


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
      
        
  res.redirect('/buylist')
        
  
  })


}
)

})



router.get('/confirm/:_id', auth,  function(req,res, next )    
  {
    
      orders.findOne({_id: req.params._id}, function(err, order)
      {

        res.render('confirm', {order}); })
    });



router.get('/confirmed/:_id',  function(req,res, next )    
  {
    

          orders.findOne({_id: req.params._id}, function(err, order)
      {

         
         sellers.findOneAndUpdate({_id:order.Seller_id},{$pull:{requests:{_id:order._id}}},function(err, seller)
  {



  })
         products.findOne({_id:order.Product_id},function(err, product)
  {

sellers.findOneAndUpdate({_id:order.Seller_id},{$pull:{nowSelling:{Name:product.Name}}},function(err, seller)
  {

console.log('>>req deleted');

  })
product.delete()

  })
order.delete();
res.redirect('/profile')

      })

 
 
  console.log('>>order deleted');

});
       
    
router.get('/out/:_id', auth,  function(req,res, next )    
  {
    
      orders.findOne({_id: req.params._id}, function(err, order)
      {


  sellers.findOneAndUpdate({_id:order.Seller_id},{$pull:{"requests":{_id:order._id}}}, function(res, seller)
  {


    console.log("deleted from now selling");
  }) 



  
    

        
    });
    });









router.get('/edit/:_id', auth,  function(req,res, next )    
  {
    
      sellers.findOne({_id: req.params._id}, function(err, seller)
      {

        res.rdirect('edit/')
    });
    })



      router.get('/add/:_id', auth, function(req,res, next )    
  {
    
      res.redirect('/add')
    
  })

router.get('/each/:_id', auth,  function(req,res, next )    
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

      var seller = new sellers({name: req.body.name , location: req.body.location , username:req.body.phone_no,
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

  res.redirect('/login');
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










router.post('/Add', Upload,auth, async function(req, res, next){



  var data = {Name: req.body.name ,Type: req.body.type, Description: req.body.description, Price:req.body.price , Seller:req.body.seller,Seller_Id:req.body._id, Image:"/uploads/"+req.file.filename }
var product = new products(data)
try
{var promise =  product.save();
  await promise;
  
 sellers.findOneAndUpdate({_id: req.body._id}, {$push: {nowSelling: data}}, function(err, seller)
      {

        req.login(seller, function(error) {
                    if (error) return next(error);
                    seller=req.user;
                   res.redirect('/profile')
                });
        if(err)
        {
          console.log(err)
        }
      
        
        
  
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
  { 
     res.redirect('/profile')
    })
router.post('/authenticate',function(request, response, next) 
{
  passport.authenticate('local', function(err, user, info) {
            if(!user){ console.log(err);
              response.redirect('/wrong')}
            else{

                request.login(user, function(error) {
                    if (error) return next(error);
                    seller=request.user;
                    response.redirect('/home')
                   
                });
  }
}
)
  (request, response, next);});









module.exports = router;