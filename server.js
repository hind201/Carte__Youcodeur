const express = require('express');
const mongoose= require('mongoose')
const bcrypt = require('bcrypt')
const cors = require('cors')
const  expressValidator  = require('express-validator');
const cookieParser =require('cookie-parser')
// const path = require('path')
const bodyPrser = require('body-parser')


//config app

const app =express();
require('dotenv').config();
 

//Middlewares
app.use(cors())
 app.use(cookieParser());
app.use(bodyPrser.json());
app.use(bodyPrser.urlencoded({extended : true}));  
app.use(express.json());
 app.use(express.urlencoded({extended : true}));
 app.use(expressValidator());
 






//import routes
const router = express.Router();
const userRoutes= require('./routes/users');



// app.get('/',(req,res) =>
//     res.send('message:welcome to my page')
//     )
//connection db
const urldb = process.env.db
mongoose.connect(urldb, {
       useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex:true 
    
}).then(()=>console.log('mongodb is connected'))
.catch((err)=>console.log(message.error))

// Routes Middlewars
 app.use('/user', userRoutes);



//listen server
const port = 3000
app.listen(port,()=>console.log(`server started on ${port}`))
