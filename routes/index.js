var express = require('express');
var router = express.Router();
const {mongodb , dbName , dbUrl} = require('../config/dbConfig.js')
const {mongoose , userModel , requestModel ,logModel } = require('../config/dbSchema')
const { hashPassword , hashCompare , createToken , decodeToken , validateToken } = require('../config/auth')
mongoose.connect(dbUrl)

/* GET home page. */
router.get('/' ,  function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/add-request' , async(req,res) => {
  try {
    let addRequest = await requestModel.create(req.body)
    res.send({
      statusCode : 200 ,
      message : "request added successfully"
    })

  }
   catch(error) {
    console.log(error)
   }
})

router.get('/list-queries', validateToken ,  async(req,res)=> {
  try {
    let result =await requestModel.find() 
    if(result) {
      res.send({
        statusCode:200 ,
        message : "listed successfully",
        result
      })
    }else {
      res.send({
        statusCode : 404 ,
        message : "list not found",
      })
    }
  }catch(error) {
    console.log(error)
  }
  
});

router.put('/update-access/:id' , validateToken ,async(req, res) => {
  try {
    let user = await userModel.findOne({_id:mongodb.ObjectId(req.params.id)})
    if(user) {
      try {
        let result = await userModel.updateOne({_id : req.params.id},{ $set : {isvalid : true}})
        res.send({
          statusCode : 200,
          message : "user updated successfully",
          user
        })
        }catch(error) {
          console.log(error)
        }
    }else {
      res.send({
        statusCode : 404 , 
        message : "user not found",
      })
    }
  }catch (error) {
    console.log(error)
  }
}) 

router.put('/update-status/:id' , validateToken ,async(req, res) => {
  try {
    let user = await requestModel.findOne({_id:mongodb.ObjectId(req.params.id)})
    if(user) {
      try {
        let result = await requestModel.updateOne({_id : req.params.id},{ $set : {status : "assigned"}})
        res.send({
          statusCode : 200,
          message : "Query updated successfully",
          result
        })

        }catch(error) {
          console.log(error)
        }
    }else {
      res.send({
        statusCode : 404 , 
        message : "Query not found",
      })
    }
  }catch (error) {
    console.log(error)
  }
}) 

router.put('/update-solve/:id' , validateToken ,async(req, res) => {
  try {
    let user = await requestModel.findOne({_id:mongodb.ObjectId(req.params.id)})
    if(user) {
      try {
        let result = await requestModel.updateOne({_id : req.params.id},{ $set : {status : "resolved" , closedBy : req.body.email} })
        res.send({
          statusCode : 200,
          message : "Query Closed successfully",
          result
        })

        }catch(error) {
          console.log(error)
        }
    }else {
      res.send({
        statusCode : 404 , 
        message : "Query not found",
      })
    }
  }catch (error) {
    console.log(error)
  }
}) 

router.post('/add-details' , async(req,res) => {
  try {
    let result = await logModel.create(req.body)
    res.send({
      statusCode : 200,
      message : "log added successfully"
    })
  }catch (error) {
    console.log(error)
  }
})

router.delete('/delete-user/:id' , async(req,res) => {
  console.log(req.params)
  try {
    let result = await userModel.deleteOne({_id:mongodb.ObjectId(req.params.id)})
    res.send({
      statusCode : 200 ,
      message : "User Deleted successfully"
    })
  }catch(error) {
    console.log(error)
  }
})

module.exports = router;
