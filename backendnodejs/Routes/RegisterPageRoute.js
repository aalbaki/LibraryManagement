const model=require('../Models/registrationmodel.js');
const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');


router.post('/login',async(req,res)=>{
    const body=req.body;
    const user=await model.find({email:body.email});
    try
    {
        if(user)
        {
            if(user[0].password===body.password)
            {
                const token=jwt.sign({'ID':user[0]._id},process.env.JWT_SECRET);
                res.json({login:true,message:'Successfully Login!','name':user[0].name,token:token});
            }
            else
               res.json({login:false,message:'Password Incorrect'});
            return;
        }
        else
        res.json({login:false,message:'User not found!'});
    }
    catch(exp)
    {
        res.json({login:false,message:'Error occuring in login!'});
    }
   
});

router.post('/register',async(req,res)=>{
    const body=req.body;

    const user=await model.findOne({email:body.email});
    if(user)
    {
        res.json('Email already exist! Kindly Login!');
        return;
    }
    if(body)
    {
        try
        {
            const user=new model(body);
            await user.save();
            res.json('Registered Successfully');
        }
        catch(exp)
        {
            res.json('Error in Saving details!');
        }
    }
    else
    {
        res.json('Form Filling error!');
    }
});

module.exports=router;