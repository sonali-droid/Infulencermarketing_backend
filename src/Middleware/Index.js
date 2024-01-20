const {check} = require("express-validator")
const { validationResult} = require("express-validator")

exports.validateForm = [
    check("name").notEmpty().withMessage("Please Enter Name"),
    check("phoneNumber").isMobilePhone().withMessage("Please Enter  valid phone number"),
    check("email").isEmail().withMessage("Please Enter valid Email"),
    check("interest").notEmpty().withMessage("Please Enter Interest"),
    check("message").isLength({max:100, min:1}).withMessage("Please Enter within 100 characters"),

]

exports.IsValidated = (req,res,next) =>{
       const errors = validationResult(req)

       if(errors.array().length > 0){
          return  res.status(400).json({message: errors.array()[0]})
       }
       next()
}