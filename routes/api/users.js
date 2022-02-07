const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
// require('dotenv');
require('dotenv').config()

const keys = require("../../config/keys");


// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateForgotPasswordInput = require("../../validation/forgotpwd");


const User = require("../../models/User");

router.post("/register", (req, res) => {
    // console.log("req = ", req.body);
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then(user => {
        console.log("user = ", user);
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});


// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    const { error, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(400).json({ emailnotfound: "Email not found." });
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched and verified
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                };
                // Sign the token
                jwt.sign(
                    payload,
                    keys.secretOrKey, {
                        expiresIn: 31556926
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token,
                            payload: payload
                        });
                    }
                );
            } else {
                return res.status(400).json({ passwordincorrect: "Password is incorrect" });
            }
        });
    });

});


router.put("/forgot-password", (req, res) => {
    const { errors, isValid } = validateForgotPasswordInput(req.body);
    
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    // console.log("email = ", email);
    User.findOne({ email: req.body.email }).then(user => {
        // console.log("user = ", user);
        if(!!!user) {
            return res.status(400).json({error: "User with this email doesn't exist!"});
        }
        
        const token = jwt.sign({id: user.id}, keys.resetKey, {expiresIn: '20m'});
        const mailOptions = {
            from : process.env.EMAIL,
            to: email,
            subject: 'Password Reset Link',
            html:
            `
                <h2>Please click on the given link to reset your password</h2>
                <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>
            `
        };

        user.updateOne({resetLink: token}, (err, success) => {
            if(err) {
                return res.status(400).json({error: "error in the reset link"});
            }
            else {
                // console.log(process.env.EMAIL);
                // console.log(process.env.PASSWORD);
                let transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    auth: {
                        user: process.env.EMAIL, 
                        pass: process.env.PASSWORD, // generated ethereal password
                    },
                });

                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                      return res.status(400).json({error: error});
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  }); 
                
            }
        });

    });

});

module.exports = router;