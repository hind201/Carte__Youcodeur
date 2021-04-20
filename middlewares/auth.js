const jwt = require('jsonwebtoken')

 const User = require('../models/user');
require('dotenv').config();


const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization")
        if(!token) return res.status(400).json({msg:"ikramuiii."})

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) return res.status(400).json({msg: "hindoo."})

            req.user = user
            next()
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}
const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
  }
  
module.exports = auth





// exports.authAdmin = async (req, res, next) => {
//     try {
//       const user = await User.findOne({_id: req.user.id})

//         if(user.role !== 1)
//               return res.status(500).json({msg: "Admin resources access denied"})
//         next()
//     } catch (err) {

//         return res.status(500).json({msg: err.message})

//     }
// }


// exports.isAdmin=(req,res,next)=>{
//     if(req,auth.role==0){
//         return res.status(403).json({
//             erroro:"Admin Resource, Access Denied!"

//         })
//         next()
//     }
// }