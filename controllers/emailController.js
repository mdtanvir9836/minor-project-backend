const nodemailer = require('nodemailer');
const crypto = require('crypto');
const {URL} =  require('url');

const User =  require('../models/user-model');
 
class emailController {
    constructor(){
        this.transporter = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port: 587,
            auth: {
                user: 'disusamor45@gmail.com',
                pass: 'kgoh yjlf eolq xxud'
            }

        });
    }

    //method to send email verification
    async sendVerification(req,res) {
        const {to} = req.body;
        console.log(to);
        
        if(!to || !this.validateEmail(to))
        {
            return res.status(400).json({message: 'invalid email address'});
        }
        //generate unique verification token 
        const verificationToken =  crypto.randomBytes(32).toString('hex');

        try
        {
            const user = await User.findOneAndUpdate(
                {email: to},
                {verificationToken},
                {upsert:true , new: true}
            );
            // construct the verification URL
            const verificationUrl = new URL(`http://localhost:8080/email/verify-email?token=${verificationToken}`);

            const mailOptions = {
                from: 'disusamor45@gmail.com',
                to: to,
                subject: 'verify your email Address',
                text: `Please verify your email address by clicking the link below:\n\n${verificationUrl.toString()}\n\nif you didn't request email.`
            };
            let info = await this.transporter.sendMail(mailOptions);
            res.status(200).json({message: 'verification email sent successfully', response: info.response});

        }catch(error)
        {
            res.status(500).json({message:'Error sending email',error:error.message});
        }

    };

    //simple email verification function
    validateEmail(email) {
        // Basic regex for validating email address
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    
} 

module.exports= new emailController();