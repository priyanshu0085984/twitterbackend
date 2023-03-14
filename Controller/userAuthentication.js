const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../Schema/Users');

exports.signup = async(req,res) =>{
    if(req.body.password === req.body.ConfirmPassword){
        const saltRounds = 10;
        bcrypt.hash(req.body.password,saltRounds)
        .then((result)=>{
            const newUser = {
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                username:req.body.username,
                email:req.body.email,
                password:result,
                age:req.body.age
            }
        })
        .catch((err)=>{
            console.log({
                message:'Error Occured while hashing the password',
                Error:err
            });
        })
        User.findOne({email:req.body.email})
        .then((result)=>{
            // if user doesn't exist
            if(!result || result.length === 0){
                User.create(newUser)
                .then((result)=>{
                    res.status(200).json({
                        status:'ok',
                        message:'User Signup Successful!',
                        userDetails:result
                    })
                })
                .catch((err)=>{
                    res.status(500).json({
                        message:'Error Occured',
                        Error:err
                    })
                })
            }
            // if user exist
            else{
                res.status(400).json({
                    message:'Email already exists!,Try using different email.'
                })
            }
        })
        .catch((err)=>{
            res.status(500).json({
                message:'Error while searching for email',
                Error:err
            })
        })
    }
    else{
        res.status(400).json({
            message:'Passwords do not match!'
        })
    }
}