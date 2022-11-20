const mongoose = require('mongoose')
const validator = require('validator')

const {mongodb , dbName , dbUrl} = './dbConfig.js'

const userSchema = new mongoose.Schema({
    firstName : {type:'string' , required: true} ,
    lastName : {type:'string', required : true} ,
    email : {
        type:'string',
        lowercase:true ,
        required:true ,
        validate : (value) => {
            return validator.isEmail(value)
        },
    },
        password : {type:'string',required:true},
        role:{ type:'string',default:'user'},
        isvalid:{type:'boolean',default:false}
    
})

const serviceRequestSchema = new mongoose.Schema({
    requestId : {type:'string',default:Date.now()},
    subject: {type:'string',required:true},
    description : {type:'string',required:true},
    status : {type:'string',default:"pending"},
    critical : {type:'string',required:true},
    createdBy : {type:'string',required:true},
    createdAt: {type:Date,default:Date.now()},
    closedBy : {type:'string',default:""},
})

const logDetailsSchema = new mongoose.Schema({
    requestId : {type:'string',required:true},
    history : {type:'string',required:true},
});

let requestModel = mongoose.model('queries-details',serviceRequestSchema)
let  userModel = mongoose.model('user-details',userSchema)
let logModel = mongoose.model('log-details',logDetailsSchema)

module.exports = {mongoose , userModel , requestModel ,logModel }