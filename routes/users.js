var express = require('express');
var router = express.Router();
const {mongodb , dbName , dbUrl} = require('../config/dbConfig.js')
const { mongoose , userModel , requestModel ,logModel  } = require('../config/dbSchema')
const { hashPassword , hashCompare , createToken , decodeToken , validateToken } = require('../config/auth');
const { FindCursor } = require('mongodb');
mongoose.connect(dbUrl)

/* GET users listing. */
router.get('/', function(req, res, next) {
  
});

router.get('/user-details/', async(req, res) => {
  try {
    let requests = await userModel.find()
    console.log(requests)
    if(requests){
      res.send({
        statusCode : 200 ,
        message : "listed successfully",
        requests
      })
    }else {
      res.send({

      })
    }
  }
  catch(error) {
    console.log(error)
  }
});

router.get('/user-detail/:isvalid', async(req, res) => {
  try {
    let requests = await userModel.find({isvalid : req.body.isvalid})
    console.log(requests)
    if(requests){
      res.send({
        statusCode : 200 ,
        message : "listed successfully",
        requests
      })
    }else {
      res.send({

      })
    }
  }
  catch(error) {
    console.log(error)
  }
});

router.post('/signup', async(req, res)=> {
  try {
    let users = await userModel.find({email:req.body.email})
    if(users.length > 0)
    {
      res.send({
        statusCode:400,
        message:"User Already Exists"
      })
    }
    else
    {
      console.log(req.body)
      let hashedPassword = await hashPassword(req.body.password)
      req.body.password = hashedPassword
      console.log(req.body)
      let user = await userModel.create(req.body)
      res.send({
        statusCode:200,
        message:"User Creation Successfull!",
        user
      })
    }

  } catch (error) {
    console.log(error)
    res.send({
      statusCode:500,
      message:"Internal Server Error",
      error
    })
  }
});

router.post('/login-user', async (req, res) => {
  try {
    console.log(req.body);
    let user = await userModel.findOne({email:req.body.email})
    console.log(user)
    if(user) {
      let validatePwd = await hashCompare(req.body.password,user.password)
      console.log(validatePwd)
      if(validatePwd){
        let token = await createToken({email:user.email,role:user.role,isvalid:user.isvalid})
        let tokenDetails = decodeToken(token)
        console.log(tokenDetails)
        res.send({
          statusCode : 200 ,
          message : "login successful",
          user , 
          token
        })
      }
    }else {
      res.send({
        statusCode : 404 ,
        message : "Login failed"
      })
    }
  }catch (error) {
    console.error(error)
  }
});


module.exports = router;
