const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const userSchema = new mongoose.Schema({
    matricule:{
        type:String, 
        required:true
    },
    firstname:{
        type:String,
        required: true
    },
    lastname:{
       type:String,

       required: true
    },
    phone:{
       type:Number,
       required: true
    },
    email:{
         type:String,
          required: true,
          unique: true,
    },
    adress:{
        type:String,
        
        required: true
    },
    
    password:{
        type:String,
    
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
   

},{timestamps:true})


module.exports = mongoose.model('User',userSchema);
