const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth')
const authAdmin= require('../middlewares/authAdmin')
 const {signup, login,getAccessToken,logout,getUserInfor,getUsersAllInfor,updateUser,deleteUser}= require('../controllers/userController')
 
const {userSignUpValidator} = require('../middlewares/userValidator');

// const {requirelogin}=require('../middlewares/auth')
// const {userByID} = require('../middlewares/aprenant')



router.post('/signup', signup,userSignUpValidator)
router.post('/login',login)
router.post('/refresh_token', getAccessToken)
router.get('/info', auth, getUserInfor)
router.get('/all_info', auth, authAdmin, getUsersAllInfor)
router.get('/logout', logout)
router.patch('/updateuser/:id', auth, authAdmin, updateUser)
router.delete('/deleteuser/:id', auth, authAdmin, deleteUser)



// router.get('/',(req,res)=>{
//     res.send('users module')
// })

// router.post('/signup',userSignUpValidator,signup)
// router.post('/login',login)
// router.post('/refresh_token',getAccessToken)
// router.get('/infor/',auth,getUserInfor)
// router.get('/signout',signout)
// router.get('/hello',requirelogin,(req,res)=>{
//   res.send('hello there')
// })

// router.get('/info/:userId',getOneUser)
// router.param('userId',userByID)
// router.get('/allinfor',authAdmin,getUsersAllInfor)


















module.exports= router;