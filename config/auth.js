const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const saltRounds = 10
const secretkey = "RAGHAVBLACK"

const {mongodb , dbName , dbUrl} = './dbConfig.js'

let hashPassword = async(password) => {
    let salt = await bcrypt.genSalt(saltRounds);
    let hashedPassword = await bcrypt.hash(password,salt)
    return hashedPassword
}

let hashCompare = async(password , hashedPassword) => {
    return bcrypt.compare(password, hashedPassword)
}

let createToken = async({email,role,isvalid}) => {    
    let token = await jwt.sign(
        {email,role,isvalid},
        secretkey ,
        {expiresIn:'1h'}
    )
    return token
}

let decodeToken = async(token)=>{
    let data = jwt.decode(token)
    return data
}

//middleware - verify the token 
let validateToken = async(req,res,next)=>{
    console.log(req.headers)
    if(req.headers && req.headers.authorization)
    {
        let token = req.headers.authorization.split(" ")[1]
        let data =  await decodeToken(token)
        let date = Math.round(new Date()/1000)
        if(date <= data.exp)
        {
            next()
        }
        else{
            res.send({
                statusCode:400,
                message:"Token Expired"
            })
        }
    }
    else
    {
        res.send({
            statusCode:400,
            message:"No token Found"
        })
    }
}

let adminGaurd = async(req,res,next)=>{
    // console.log(req.headers +" "+ req.headers.authorization) 
    if(req.headers && req.headers.authorization)
    {
        let token = req.headers.authorization.split(" ")[1]
        let data =  await decodeToken(token)
        // console.log(token+" "+data.role)
        if(data.role==="admin" || data.role === "manager")
            next()
        else
            res.send({
                statusCode:401,
                message:"Unauthorised! Only Admin can access"
            })
    }
    else
    {
        res.send({
            statusCode:400,
            message:"No token Found"
        })
    }
}
 
//middleware = verify the employee

let validEmployee = async(req,res,next) =>{
    // console.log(req.headers +" "+ req.headers.authorization) 
    if(req.headers && req.headers.authorization)
    {
        let token = req.headers.authorization.split(" ")[1]
        let role =  await decodeToken(token)
        // console.log(token+" "+data.role)
        if(data.role==="admin" || data.role === "manager")
            next()
        else
            res.send({
                statusCode:401,
                message:"Unauthorised! Only Admin can access"
            })
    }
    else
    {
        res.send({
            statusCode:400,
            message:"No token Found"
        })
    }
}

module.exports = { hashPassword , hashCompare , createToken , decodeToken , validateToken , adminGaurd }