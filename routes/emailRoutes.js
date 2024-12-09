const express = require('express');
const emailController = require('../controllers/emailController');
const router = express.Router();
const User =  require('../models/user-model');

router.post('/mail', (req, res) => emailController.sendVerification(req,res));
router.get('/verify-email', async(req,res)=>{
    const {token}= req.query;
    console.log(token);
    

    if(!token)
    {
        return res.status(400).json({message:'Token is required'});
    }

    try {
        // find user by verification token
        const user = await User.findOneAndUpdate(
            {verificationToken: token},
            {isVerified: true, verificationToken: undefined},
            {new: true} // Return the updated document
        );
        if(!user)
        {
            return res.status(400).json({message: 'Invalid or Expired Token'});
        }

       

        return res.status(200).json({message: 'Email  verified successfully'});


        
    } catch (error) {
         return res.status(500).json({message : 'error verifying email', error: error.message});
    }
});

module.exports = router;