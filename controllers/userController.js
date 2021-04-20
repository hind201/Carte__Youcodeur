const User = require('../models/user');
const mongoose =require('mongoose')
const bcrypt=require('bcrypt');
 const jwt = require('jsonwebtoken');
 const cookieParser = require('cookie-parser')
//  const expressJwt = require('express-jwt');
 require('dotenv').config();





exports.signup =async(req,res)=>{
 
     const {matricule,firstname,lastname, phone,email,adress,password}= req.body;
          // Password Encryption
          const hashh= await bcrypt.hash(password, 10);
//           const newUser={matricule,firstname,lastname, phone,email,adress,password:hashh}
//            const activation_token=  createActivationToken(newUser)
//    console.log({activation_token})
     const user= new User({
        matricule:matricule,
        firstname:firstname,
        lastname:lastname,
        phone:phone,
        email:email,
        adress:adress,
        password:hashh
     });
    
         //save mongod
     user.save((err, user)=>{
         if(err){
             return res.status(400).send(err)
         }
        res.send(user)

     })
     }


exports.login= (req,res) =>{

const {email,password}=req.body;
 User.findOne({email},async(err,user)=>{

    if(err|| !user){
        return res.status(400).json({
            error:'User not fond with this email, Please SignUp!'
        })

 }
 const isMatch =await bcrypt.compare(password, user.password)
 if(!isMatch) return res.status(400).json({msg: "Incorrect password."})
    
 const refresh_token = createRefreshToken({id: user._id})
 res.cookie('refreshtoken', refresh_token, {
  httpOnly: true,
  path: '/user/refresh_token',
  maxAge: 7*24*60*60*1000 // 7 days
})

//  res.json({msg: "Login success!"})
const{_id,email,lastname,role}=user;
return res.json({
  refresh_token,user:{_id,email,lastname,role}
})

  })
  


}

// const token = jwt.sign({_id: user._id, role:user.role }, process.env.jwt_secret)

// res.cookie('cookie',token,{expire:new Date()+806200})
// const{_id,email,lastname,role}=user;
// return res.json({
//       token,user:{_id,email,lastname,role}
// })

 
 


exports.getAccessToken= (req, res) => {
  try {
      const rf_token = req.cookies.refreshtoken
      if(!rf_token) return res.status(400).json({msg: "Please login now!"})
      

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
          if(err) return res.status(400).json({msg: "Please login now!"})

          const access_token = createAccessToken({id: user.id})
          res.json({access_token})
      })
  } catch (err) {
      return res.status(500).json({msg: err.message})
  }
}

exports.getUserInfor= async (req, res) => {
  try {
      const user = await User.findById(req.user.id).select('-password')

      res.json(user)
  } catch (err) {
      return res.status(500).json({msg: err.message})
  }
}

exports.getUsersAllInfor= async (req, res) => {
  try {
      const users = await User.find().select('-password')

      res.json(users)
  } catch (err) {
      return res.status(500).json({msg: err.message})
  }
}
exports.logout= async (req, res) => {
          try {
              res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
              return res.json({msg: "Logged out."})
          } catch (err) {
              return res.status(500).json({msg: err.message})
          }
      }
    
exports.updateUser=async (req, res) => {
          try {
              const {matricule,firstname,lastname, phone,email,adress,password} = req.body
    
              await User.findOneAndUpdate({_id: req.params.id}, {
                matricule:matricule,
                firstname:firstname,
                lastname:lastname,
                phone:phone,
                email:email,
                adress:adress,
                password:password
              })
    
              res.json({msg: "Update Success!"})
          } catch (err) {
              return res.status(500).json({msg: err.message})
          }
      }
exports.deleteUser= async (req, res) => {
          try {
              await User.findByIdAndDelete(req.params.id)
    
              res.json({msg: "Deleted Success!"})
          } catch (err) {
              return res.status(500).json({msg: err.message})
          }
}
    
      
    
    
    
// exports.signout=(req,res)=>{
//   res.clearCookie('cookie');
//   res.json({ message:'User Signout'})
// }

// exports.getOneUser=(req,res)=>{
//   res.json({user:req.info})
// }

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
  }
  
// const createActivationToken = (payload) => {
//   return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '5m'})
// }




