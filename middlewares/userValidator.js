
 exports.userSignUpValidator = (req,res,next)=>{
    req.check('matricule','Matricule is Required').notEmpty();
    req.check('firstname','Firstname is required').notEmpty();
    req.check('lastname','Lastname is required').notEmpty();
    req.check('phone','Phone is required').notEmpty();
    req.check('email','Email is required')
    .notEmpty()
    .isEmail();
    req.check('adress','Adress is required').notEmpty();
    
    
    req.check('password','Password is required').notEmpty()
    .isLength({min:6,max:15})
    .withMessage('Password must between 6 and 10 Caracters')

    const errors = req.validationErrors()
    if(errors){
        return res.status(400).json(errors)
    }
    next()

}