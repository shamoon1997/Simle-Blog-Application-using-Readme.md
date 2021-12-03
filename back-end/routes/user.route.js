const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const User = require('../models/user.model');

router.post('/Signup', async function (req,res) {
    const {username,password} = req.body;
    try{
        const response = await User.create({username,password});
        res.status(201).json(response);
    }
    catch(error){
        res.status(500).json({'Error':error})
    }
});

router.post('/Login', async function (req,res) {
    const {username,password} = req.body;
    try{
        let token = crypto.randomBytes(48).toString('hex');
        const response = await User.findOneAndUpdate({username,password},{token:token},{new:true});
        console.log(response);
        if(response!==null){
            res.status(200).json(response);    
        }
        res.status(400).json(response);
    }
    catch(error){
        res.status(500).json({'Error':error})
    }
});


router.post('/Logout', async function (req,res) {
    const {token} = req.body;
    try{
        const response = await User.findOneAndUpdate({token},{token:null},{new:true});
        console.log(response);
        res.status(201).json(response);
    }
    catch(error){
        res.status(500).json({'Error':error})
    }
});


module.exports=router;